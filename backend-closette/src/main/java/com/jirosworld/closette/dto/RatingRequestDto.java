package com.jirosworld.closette.dto;

import javax.validation.constraints.Size;


public class RatingRequestDto {

        private int id;

        @Size(min=1, max=10, message="Rating number must be a whole number between 1 and 10.")
        public int rating;

        // setters and getters

        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        public int getRating() {
                return rating;
        }

        public void setRating(int rating) {
                this.rating = rating;
        }

}
