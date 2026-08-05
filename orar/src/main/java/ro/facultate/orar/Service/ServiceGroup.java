package ro.facultate.orar.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.facultate.orar.Entity.Group;
import ro.facultate.orar.Repository.RepoGroup;

import java.util.List;

@Service
public class ServiceGroup {

    @Autowired
    private RepoGroup repoGroup;

    public List<Group> getAllGroups() {
        return repoGroup.findAll();
    }

    public Group addGroup(Group group) { return repoGroup.save(group);}
}