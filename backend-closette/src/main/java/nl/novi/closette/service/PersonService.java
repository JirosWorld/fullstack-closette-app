package nl.novi.closette.service;

import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.Toilet;
import nl.novi.closette.model.Person;
import nl.novi.closette.repository.ToiletRepository;
import nl.novi.closette.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ToiletRepository toiletRepository;

    public Iterable<Person> getPersons(String title) {
        return personRepository.findAll();
    }

    public Person getPerson(int id) {
        Optional<Person> optionalPerson = personRepository.findById(id);

        if (optionalPerson.isPresent()) {
            return optionalPerson.get();
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }

    }

    public void deletePerson(int id) {
        if (personRepository.existsById(id)) {
            personRepository.deleteById(id);
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

    public int addPerson(Person person) {
        Person newPerson = personRepository.save(person);
        return newPerson.getId();
    }

    public List<Toilet> getPersonToilets(int id) {
        Optional<Person> optionalPerson = personRepository.findById(id);

        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            return person.getToilets();
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

    public void addPersonToilet(int id, Toilet toilet) {
        Optional<Person> optionalPerson = personRepository.findById(id);

        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            List<Toilet> toilets = person.getToilets();

            toiletRepository.save(toilet);

            toilets.add(toilet);
            personRepository.save(person);
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }


}
