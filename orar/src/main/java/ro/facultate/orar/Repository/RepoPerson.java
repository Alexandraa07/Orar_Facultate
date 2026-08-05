package ro.facultate.orar.Repository;

import ro.facultate.orar.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface RepoPerson extends JpaRepository<Person, Integer> {

    List<Person> findByLastName(String lastName);

    List<Person> findByFirstName(String firstName);

    Optional<Person> findByPersonalId(String personalId);

    List<Person> findByFatherInitial(String fatherInitial);

    Optional<Person> findByUsername(String username);
}