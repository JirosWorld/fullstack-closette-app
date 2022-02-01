package com.jirosworld.closette.dto;

import javax.validation.constraints.Size;


public class RatingRequestDto {

        // attributen

        private int id;

        @Size(min=1, max=10, message="Rating number must be a whole number between 1 and 10.")
        private int ratingToilet;

        // setters and getters

        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        public int getRatingToilet() {
                return ratingToilet;
        }

        public void setRatingToilet(int ratingToilet) {
                this.ratingToilet = ratingToilet;
        }

}
