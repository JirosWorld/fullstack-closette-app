package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.repository.ToiletRepository;
import com.jirosworld.closette.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ToiletRepository toiletRepository;

    //    find all
    public Iterable<Rating> findAllRatings() {
        return ratingRepository.findAll();
    }

    public Iterable<Rating> getRatings(String title) {
        return ratingRepository.findAll();
    }

    public Rating getRating(int id) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);

        if (optionalRating.isPresent()) {
            return optionalRating.get();
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public void deleteRating(int id) {
        if (ratingRepository.existsById(id)) {
            ratingRepository.deleteById(id);
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public int addRating(Rating rating) {
        Rating newRating = ratingRepository.save(rating);
        return newRating.getId();
    }

    public void updateRating(int id, Rating rating) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);

        if (optionalRating.isPresent()) {
            Rating storedRating = optionalRating.get();

            rating.setId(storedRating.getId());
            ratingRepository.save(rating);
        } else {
            throw new RecordNotFoundException("ID does not exist.");
        }
    }

}