package ro.facultate.orar.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.facultate.orar.Entity.Timetable;

@Repository
public interface RepoTimetable extends JpaRepository<Timetable, Integer> {
}
