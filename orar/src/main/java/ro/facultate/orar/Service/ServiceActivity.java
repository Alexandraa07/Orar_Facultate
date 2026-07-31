package ro.facultate.orar.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.facultate.orar.Entity.Activity;
import ro.facultate.orar.Repository.RepoActivity;

import java.util.List;

@Service
public class ServiceActivity {

    @Autowired
    private RepoActivity repoActivity;

    public List<Activity> getActivityByGroup(Integer groupId) {
        return repoActivity.findByGroup_Id(groupId);
    }

    public List<Activity> getAllActivities() {
        return repoActivity.findAll();
    }

    public Activity addActivity(Activity activity) {
        return repoActivity.save(activity);
    }
}