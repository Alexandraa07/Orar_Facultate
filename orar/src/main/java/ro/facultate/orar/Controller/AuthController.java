package ro.facultate.orar.Controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.DTO.LoginRequest;
import ro.facultate.orar.DTO.LoginResponse;
import ro.facultate.orar.Entity.Person;
import ro.facultate.orar.Repository.RepoPerson;
import ro.facultate.orar.Security.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class AuthController {

    private final RepoPerson repoPerson;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(RepoPerson repoPerson, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repoPerson = repoPerson;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request,
                                               HttpServletResponse response) {

        Person person = repoPerson.findByUsername(request.getUsername())
                .orElse(null);

        // Dacă utilizatorul nu există sau parola este greșită
        if (person == null) {
            return ResponseEntity.status(401).build();
        }

        // Verificare parolă (suport atât pentru BCrypt cât și pentru text clar temporar)
        boolean matches = passwordEncoder.matches(request.getPassword(), person.getPassword())
                || request.getPassword().equals(person.getPassword());

        if (!matches) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtService.generateToken(person.getUsername(), person.getRole().name());

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60 * 60)
                .sameSite("Lax") // Pentru mediu de dev pe HTTP local
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new LoginResponse(
                "Login reusit",
                person.getRole().name(),
                person.getUsername(),
                token
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }
}