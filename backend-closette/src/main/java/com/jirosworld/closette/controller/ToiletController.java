package com.jirosworld.closette.controller;

import com.jirosworld.closette.dto.ToiletRequestDto;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.service.RatingService;
import com.jirosworld.closette.service.ToiletService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
public class ToiletController {

    @Autowired
    private ToiletService toiletService;

    @Autowired
    private RatingService ratingService;

    @GetMapping(value = "/toilets")
    public ResponseEntity<Object> getToilets(@RequestParam(value = "title", required = false) String title, @RequestParam(value = "city", required = false) String city, @RequestParam(value = "country", required = false) String country) {


        List<Toilet> toilets;
        if (title == null && city != null && country == null) {
            toilets = toiletService.getToiletsByCity(city);
        } else if (title != null && city == null && country == null) {
            toilets = toiletService.getToiletsByTitle(title);
        } else if (title == null && city == null && country != null) {
            toilets = toiletService.getToiletsByCountry(country);
        }
//        else if (title != null && city != null && country != null) {
//            toilets = (List<Toilet>) toiletService.findAllToiletsQuery(title, city, country);
//        }
        else {
            toilets = toiletService.getToilets();
        }

        return ResponseEntity.ok(toilets);
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

    @PatchMapping(value = "/toiletsdto/{id}")
    public ResponseEntity<Object> partialUpdateToiletDto(@PathVariable int id, @RequestBody ToiletRequestDto toiletRequestDto) {
        toiletService.partialUpdateToiletDto(id, toiletRequestDto);

        return ResponseEntity.noContent().build();
    }

    //    relation tables
    @GetMapping(value = "/toilets/{id}/photos")
    public ResponseEntity<Object> getToiletPhoto(@PathVariable int id) {
        return ResponseEntity.ok(toiletService.getToiletPhoto(id));
    }

    @PostMapping(value = "/toilets/{id}/photos")
    public ResponseEntity<Object> addToiletPhoto(@PathVariable int id, @RequestBody Photo photo) {
        toiletService.addToiletPhoto(id, photo);
        return ResponseEntity.created(null).build();
    }

    // search all ratings for this toilet
    @GetMapping(value = "/toilets/{id}/ratings")
    public ResponseEntity<Object> getToiletRatings(@PathVariable int id) {
        return ResponseEntity.ok(toiletService.getToiletRatings(id));
    }

    // this Toilet's ID gets a new Rating
    @PostMapping(value = "/toilets/{id}/ratings")
    public ResponseEntity<Object> addToiletRating(@PathVariable int id, @RequestBody Rating ratingToilet) {
        toiletService.addToiletRating(id, ratingToilet);
        return ResponseEntity.created(null).build();
    }

}
