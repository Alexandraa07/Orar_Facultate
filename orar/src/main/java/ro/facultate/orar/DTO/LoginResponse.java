package ro.facultate.orar.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String role;
    private String username;
    private String jwtToken;
}