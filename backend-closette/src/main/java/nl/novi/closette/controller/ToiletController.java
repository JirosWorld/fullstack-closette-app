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
import java.util.ArrayList;
import java.util.List;

@RestController
public class ToiletController {

    @Autowired
    private ToiletService toiletService;

    @GetMapping(value = "/toilets")
    public ResponseEntity<Object> getToilets(@RequestParam(value="title", required = false) String title, @RequestParam(value="city", required = false ) String city, @RequestParam(value="country", required = false) String country) {


        List<Toilet> toilets;
        if(title == null && city!= null && country == null){
            toilets = toiletService.getToiletsByCity(city);
        } else if(title != null && city== null && country == null){
            toilets = toiletService.getToiletsByTitle(title);
        } else if(title == null && city== null && country != null){
            toilets = toiletService.getToiletsByCountry(country);
        } else {
            toilets = toiletService.getToilets();
        }

        return ResponseEntity.ok(toilets);   // Jackson  object => json
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
