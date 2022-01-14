package nl.novi.closette.service;

import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.Toilet;
import nl.novi.closette.model.User;
import nl.novi.closette.model.Rating;
import nl.novi.closette.repository.ToiletRepository;
import nl.novi.closette.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private ToiletRepository toiletRepository;

    public Iterable<Rating> getRatings(String title) {
        return ratingRepository.findAll();
    }

    public Rating getRating(int id) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);

        if (optionalRating.isPresent()) {
            return optionalRating.get();
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }

    }

    public void deleteRating(int id) {
        if (ratingRepository.existsById(id)) {
            ratingRepository.deleteById(id);
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

    public int addRating(Rating rating) {
        Rating newRating = ratingRepository.save(rating);
        return newRating.getId();
    }

    public List<Toilet> getRatingToilets(int id) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);

        if (optionalRating.isPresent()) {
            Rating rating = optionalRating.get();
            return rating.getToilets();
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

    public void addRatingToilet(int id, Toilet toilet) {
        Optional<Rating> optionalRating = ratingRepository.findById(id);

        if (optionalRating.isPresent()) {
            Rating rating = optionalRating.get();
            List<Toilet> toilets = rating.getToilets();

            toiletRepository.save(toilet);

            toilets.add(toilet);
            ratingRepository.save(rating);
        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }


}
