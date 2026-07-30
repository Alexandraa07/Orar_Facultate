package ro.facultate.orar.Controller;

import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.Entity.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import ro.facultate.orar.Service.ServiceProfessor;

import java.util.List;

@RestController
@RequestMapping("/professor")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")
public class ProfessorController {

    @Autowired
    private ServiceProfessor serviceProfessor;

    @GetMapping("/all")
    public List<Professor> getAll() {
        return serviceProfessor.getAllProfessors();
    }

    @PostMapping("/add")
    public Professor addProfessor(@RequestBody Professor professor) {
        return serviceProfessor.addProfessor(professor);
    }
}