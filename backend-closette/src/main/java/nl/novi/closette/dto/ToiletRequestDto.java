package nl.novi.closette.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


public class ToiletRequestDto {

        // attributen

        @NotBlank
        @Size(min=1, max=100)
        private String title;

        @NotBlank
        @Size(min=1, max=100)
        private String author;

        @NotBlank
        @Size(min=2, max=20, message="latitude is too long or too short.")
        private String latitude;

        // getters and setters

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getAuthor() {
                return author;
        }

        public void setAuthor(String author) {
                this.author = author;
        }

        public String getLatitude() {
                return latitude;
        }

        public void setLatitude(String latitude) {
                this.latitude = latitude;
        }

}
