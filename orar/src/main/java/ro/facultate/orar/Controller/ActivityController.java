package ro.facultate.orar.Controller;

import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.Entity.Activity;
import ro.facultate.orar.Service.ServiceActivity;
import org.springframework.beans.factory.annotation.Autowired;

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

    @PostMapping("/add")
    public Activity addActivity(@RequestBody Activity activity) {
        return serviceActivity.addActivity(activity);
    }

    @GetMapping("/all")
    public List<Activity> getAllActivities() {
        return serviceActivity.getAllActivities();
    }

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Integer id) {
        return serviceActivity.getActivityById(id);
    }
}