package nl.novi.closette.controller;

import nl.novi.closette.dto.ToiletRequestDto;
import nl.novi.closette.model.Toilet;

import nl.novi.closette.service.ToiletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
public class ToiletController {

    @Autowired
    private ToiletService toiletService;

    @GetMapping(value = "/toilets")
    public ResponseEntity<Object> getToilets(@RequestParam(name="title", defaultValue="") String title) {
        return ResponseEntity.ok(toiletService.getToilets(title));   // Jackson  object => json
    }

    @GetMapping(value = "/toilets/{id}")
    public ResponseEntity<Object> getToilet(@PathVariable int id) {
        return ResponseEntity.ok(toiletService.getToilet(id));
    }

    @DeleteMapping(value = "/toilets/{id}")
    public ResponseEntity<Object> deleteToilet(@PathVariable("id") int id) {
        toiletService.deleteToilet(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/toilets")
    public ResponseEntity<Object> addToilet(@Valid @RequestBody ToiletRequestDto toiletRequestDto) {
        int newId = toiletService.addToilet(toiletRequestDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newId).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping(value = "/toilets/{id}")
    public ResponseEntity<Object> updateToilet(@PathVariable int id, @RequestBody Toilet toilet) {
        toiletService.updateToilet(id, toilet);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping(value = "/toilets/{id}")
    public ResponseEntity<Object> partialUpdateToilet(@PathVariable int id, @RequestBody Toilet toilet) {
        toiletService.partialUpdateToilet(id, toilet);

        return ResponseEntity.noContent().build();
    }

}
