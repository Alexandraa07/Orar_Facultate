package ro.facultate.orar.Controller;

import ro.facultate.orar.Entity.Activity;
import ro.facultate.orar.Service.ServiceActivity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")
public class ActivityController {

    @Autowired
    private ServiceActivity serviceActivity;

    @GetMapping("/group/{groupId}")
    public List<Activity> getActivityByGroup(@PathVariable Integer groupId) {
        return serviceActivity.getActivityByGroup(groupId);
    }

    @GetMapping("/all")
    public List<Activity> getAllActivities() {
        return serviceActivity.getAllActivities();
    }
}