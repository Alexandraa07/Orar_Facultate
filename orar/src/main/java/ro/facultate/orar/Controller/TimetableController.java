package ro.facultate.orar.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.facultate.orar.Entity.Timetable;
import ro.facultate.orar.Service.ServiceTimetable;

import java.util.List;

@RestController
@RequestMapping("/timetable")
public class TimetableController {
    @Autowired
    private ServiceTimetable serviceTimetable;

    @PostMapping("/add")
    public Timetable addTimetable(@RequestBody Timetable timetable)
    {
        return serviceTimetable.addTimetable(timetable);
    }

    @GetMapping("/all")
    public List<Timetable> getAllTimetables()
    {
        return serviceTimetable.getAllTimetables();
    }

    @GetMapping("/{id}")
    public Timetable getTimetableById(@PathVariable Integer id) {
        return serviceTimetable.getTimetableById(id);
    }
    @PutMapping("/{id}")
    public Timetable updateTimetable(@PathVariable Integer id, @RequestBody Timetable timetable) {
        return serviceTimetable.updateTimetable(id, timetable);
    }
}
