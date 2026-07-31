package ro.facultate.orar.Service;
import ro.facultate.orar.Entity.Course;
import ro.facultate.orar.Repository.RepoCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCourse {@Autowired
private RepoCourse repoCourse;

    public Course addCourse(Course course) {
        return repoCourse.save(course);
    }

    public List<Course> getAllCourses() {
        return repoCourse.findAll();
    }

    public Course getCourseById(Integer id) {
        return repoCourse.findById(id)
                .orElseThrow(() -> new RuntimeException("Course inexistent cu id-ul: " + id));
    }

    public Course updateCourse(Integer id, Course courseNou) {
        Course course = repoCourse.findById(id)
                .orElseThrow(() -> new RuntimeException("Course inexistent cu id-ul: " + id));

        course.setName(courseNou.getName());
        course.setCredits(courseNou.getCredits());
        course.setYear(courseNou.getYear());
        course.setSemester(courseNou.getSemester());
        course.setAbbreviation(courseNou.getAbbreviation());

        return repoCourse.save(course);
    }
}
