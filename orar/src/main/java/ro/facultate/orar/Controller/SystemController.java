package ro.facultate.orar.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import ro.facultate.orar.Service.ServiceActivity;
import ro.facultate.orar.Entity.Activity;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/system")
public class SystemController {

    @Autowired
    private ServiceActivity serviceActivity;

    @GetMapping("/status")
    public Map<String, String> status() {
        return Map.of("status", "OK");
    }

    @GetMapping("/activity/group/{groupId}")
    public String activityGroup(@PathVariable Integer groupId) {
        return "Ai cerut orarul grupei " + groupId;
    }
}