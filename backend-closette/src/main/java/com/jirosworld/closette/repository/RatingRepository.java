package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    List<Rating> findAllByRating(int rating);

}