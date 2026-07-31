package ro.facultate.orar.Controller;

import ro.facultate.orar.Entity.Course;
import ro.facultate.orar.Service.ServiceCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")

public class CourseController {

    @Autowired
    private ServiceCourse serviceCourse;
    
    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return serviceCourse.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Integer id) {
        return serviceCourse.getCourseById(id);
    }
}