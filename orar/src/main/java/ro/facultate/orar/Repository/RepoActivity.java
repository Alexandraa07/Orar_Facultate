package ro.facultate.orar.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.facultate.orar.Entity.Group;
import ro.facultate.orar.Entity.Activity;
import ro.facultate.orar.Entity.Professor;
import ro.facultate.orar.Entity.ActivityType;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface RepoActivity extends JpaRepository<Activity, Integer> {

    List<Activity> findByStartTime(LocalTime time);

    List<Activity> findByDay(String day);

    List<Activity> findByWeek(String week);

    List<Activity> findByProfessor(Professor professor);

    List<Activity> findByGroup(Group group);

    List<Activity> findByCourse_IdAndActivityType(Integer courseId, ActivityType activityType);

    List<Activity> findByGroup_Id(Integer groupId);

    List<Activity> findByGroup_IdAndDay(Integer groupId, String day);
}