package ro.facultate.orar.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.facultate.orar.Entity.Timetable;
import ro.facultate.orar.Repository.RepoTimetable;

import java.util.List;

@Service
public class ServiceTimetable {
    @Autowired
    private RepoTimetable repoTimetable;

    public Timetable addTimetable(Timetable schedule) {
        return repoTimetable.save(schedule);
    }

    public List<Timetable> getAllTimetables() {
        return repoTimetable.findAll();
    }

    public Timetable getTimetableById(Integer id) {
        return repoTimetable.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable inexistent cu id-ul: " + id));
    }

}
