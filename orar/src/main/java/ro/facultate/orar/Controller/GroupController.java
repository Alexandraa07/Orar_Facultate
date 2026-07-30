package ro.facultate.orar.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.Entity.Group;
import ro.facultate.orar.Service.ServiceGroup;

import java.util.List;

@RestController
@RequestMapping("/group")
@CrossOrigin(originPatterns = "http://localhost:*", allowCredentials = "true")
public class GroupController {

    @Autowired
    private ServiceGroup serviceGroup;

    @GetMapping("/all")
    public List<Group> getAll() {
        return serviceGroup.getAllGroups();
    }
}