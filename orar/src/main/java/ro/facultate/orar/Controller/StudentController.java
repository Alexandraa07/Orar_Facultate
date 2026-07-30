package ro.facultate.orar.Controller;

import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.Entity.Activity;
import ro.facultate.orar.Entity.Student;
import ro.facultate.orar.Service.ServiceStudent;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")
public class StudentController {

    @Autowired
    private ServiceStudent serviceStudent;

    @GetMapping("/all")
    public List<Student> getAll() {
        return serviceStudent.getAllStudents();
    }

    @GetMapping("/{studentId}/courses/{day}")
    public List<Activity> getStudentActivitiesByDay(@PathVariable Integer studentId, @PathVariable String day) {
        return serviceStudent.getActivityStudentDay(studentId, day);
    }

    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return serviceStudent.addStudent(student);
    }
}