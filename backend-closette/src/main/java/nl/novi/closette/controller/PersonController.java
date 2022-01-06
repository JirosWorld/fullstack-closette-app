package nl.novi.closette.controller;

import nl.novi.closette.model.Toilet;
import nl.novi.closette.model.Person;
import nl.novi.closette.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping(value = "/persons")
    public ResponseEntity<Object> getPersons(@RequestParam(name="title", defaultValue="") String title) {
        return ResponseEntity.ok(personService.getPersons(title));   // Jackson  object => json
    }

    @GetMapping(value = "/persons/{id}")
    public ResponseEntity<Object> getPerson(@PathVariable int id) {
        return ResponseEntity.ok(personService.getPerson(id));
    }

    @DeleteMapping(value = "/persons/{id}")
    public ResponseEntity<Object> deletePerson(@PathVariable("id") int id) {
        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/persons")
    public ResponseEntity<Object> addPerson(@RequestBody Person person) {
        int newId = personService.addPerson(person);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newId).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping(value = "/persons/{id}/toilets")
    public ResponseEntity<Object> getPersonToilets(@PathVariable int id) {
        return ResponseEntity.ok(personService.getPersonToilets(id));
    }

    @PostMapping(value = "/persons/{id}/toilets")
    public ResponseEntity<Object> addPersonToilet(@PathVariable int id, @RequestBody Toilet toilet) {
        personService.addPersonToilet(id, toilet);
        return ResponseEntity.created(null).build();
    }
}
