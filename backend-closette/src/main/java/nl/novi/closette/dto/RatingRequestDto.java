package nl.novi.closette.dto;

import javax.validation.constraints.Size;


public class RatingRequestDto {

        // attributen

        private int id;

        @Size(min=1, max=10, message="Rating number must be a whole number between 1 and 10.")
        private double ratingToilet;

        private String name;

        // setters and getters


        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        public double getRatingToilet() {
                return ratingToilet;
        }

        public void setRatingToilet(double ratingToilet) {
                this.ratingToilet = ratingToilet;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }
}
