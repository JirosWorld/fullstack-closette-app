package nl.novi.closette.repository;

import nl.novi.closette.model.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Integer> {
}
