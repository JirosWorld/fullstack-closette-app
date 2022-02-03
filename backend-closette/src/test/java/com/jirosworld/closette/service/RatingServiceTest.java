package com.jirosworld.closette.service;

import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.repository.RatingRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RatingServiceTest {

    @Mock
    RatingRepository ratingRepository;

    @InjectMocks
    private RatingService ratingService;

    @Captor
    ArgumentCaptor<Rating> ratingCaptor;

    @Test
    public void getRatingTest() {
        Rating rating = new Rating();
        rating.setRating(8);
        when(ratingRepository.findById(1)).thenReturn(Optional.of(rating));

        var rating1 =ratingService.getRating(1);
        assertThat(rating1.getRating()).isEqualTo(8);
    }

    @Test
    public void getRatingsTest() {
        List<Rating> testRatings = new ArrayList<>();
        Rating rating1 = new Rating();
        rating1.setId(1);
        rating1.setRating(3);
        Rating rating2 = new Rating();
        rating2.setId(2);
        rating2.setRating(10);
        Rating rating3 = new Rating();
        rating3.setId(3);
        rating3.setRating(8);

        testRatings.add(rating1);
        testRatings.add(rating2);
        testRatings.add(rating3);

        when(ratingRepository.findAll()).thenReturn(testRatings);

//        int id = 6;
        ratingService.findAllRatings();

        verify(ratingRepository, times(1)).findAll();

        assertThat(testRatings.size()).isEqualTo(3);
        assertThat(testRatings.get(0)).isEqualTo(rating1);
        assertThat(testRatings.get(1)).isEqualTo(rating2);
        assertThat(testRatings.get(2)).isEqualTo(rating3);
    }


    @Test
    public void saveRatingTest() {
        Rating rating = new Rating();
        rating.setId(1);
        rating.setRating(7);

        ratingRepository.save(rating);

        verify(ratingRepository, times(1)).save(ratingCaptor.capture());
        var rating1 = ratingCaptor.getValue();

        assertThat(rating1.getRating()).isEqualTo(7);
        assertThat(rating1.getId()).isEqualTo(1);
    }


    @Test
    public void updateRatingTest() {
        Rating rating1 = new Rating();
        rating1.setId(1);
        rating1.setRating(5);
        when(ratingRepository.findById(1)).thenReturn(Optional.of(rating1));

        rating1.setRating(5);
        ratingService.updateRating(1, rating1);

        verify(ratingRepository).save(rating1);

        assertThat(rating1.getId()).isEqualTo(1);
        assertThat(rating1.getRating()).isEqualTo(5);
    }

//    @Test
//    public void updateRatingExceptionTest() {
//        assertThrows(RecordNotFoundException.class, () -> ratingService.getRating(null));
//    }

//    @Test
//    public void deleteRatingTest() {
//        Rating rating1 = new Rating();
//        rating1.setId(1);
//        rating1.setRating(7);
//
//        ratingRepository.delete(rating1);
//
//        ratingService.deleteRating(1);
//
//        verify(ratingRepository, times(1)).delete(rating1);
//    }
}