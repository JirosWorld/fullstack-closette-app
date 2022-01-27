package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.Rating;
import org.springframework.data.repository.CrudRepository;

public interface RatingRepository extends CrudRepository<Rating, Integer> {
}
