package ro.facultate.orar.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.facultate.orar.Entity.Professor;
import ro.facultate.orar.Entity.Student;
import ro.facultate.orar.Repository.RepoActivity;
import ro.facultate.orar.Repository.RepoProfessor;

import java.util.List;

@Service
public class ServiceProfessor {

    @Autowired
    private RepoProfessor repoProfessor;

    @Autowired
    private RepoActivity repoActivity;

    public List<Professor> getAllProfessors() {
        return repoProfessor.findAll();
    }

    public Professor addProfessor(Professor professor) {
        return repoProfessor.save(professor);
    }
}