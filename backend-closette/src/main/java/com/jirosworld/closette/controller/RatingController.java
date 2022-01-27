package com.jirosworld.closette.controller;

import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping(value = "/ratings")
    public ResponseEntity<Object> getRatings(@RequestParam(name="title", defaultValue="") String title) {
        return ResponseEntity.ok(ratingService.getRatings(title));   // Jackson  object => json
    }

    @GetMapping(value = "/ratings/{id}")
    public ResponseEntity<Object> getRating(@PathVariable int id) {
        return ResponseEntity.ok(ratingService.getRating(id));
    }

    @DeleteMapping(value = "/ratings/{id}")
    public ResponseEntity<Object> deleteRating(@PathVariable("id") int id) {
        ratingService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/ratings")
    public ResponseEntity<Object> addRating(@RequestBody Rating rating) {
        int newId = ratingService.addRating(rating);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newId).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping(value = "/ratings/{id}/toilets")
    public ResponseEntity<Object> getRatingToilets(@PathVariable int id) {
        return ResponseEntity.ok(ratingService.getRatingToilets(id));
    }

    @PostMapping(value = "/ratings/{id}/toilets")
    public ResponseEntity<Object> addRatingToilet(@PathVariable int id, @RequestBody Toilet toilet) {
        ratingService.addRatingToilet(id, toilet);
//        int newId = ratingService.addRatingToilet(id, toilet);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{toilet}/{id}")
//                .buildAndExpand(newId).toUri();

        return ResponseEntity.created(null).build();
    }
}
