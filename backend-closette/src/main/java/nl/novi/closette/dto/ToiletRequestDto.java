package nl.novi.closette.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;


public class ToiletRequestDto {

        // attributen

        @NotBlank
        @Size(min=1, max=100)
        private String title;

        @Size(min=0, max=20, message="latitude is too long, please use a dot.")
        private String latitude;

        @Size(min=0, max=20, message="longitude is too long, please use a dot.")
        private String longitude;

        private String postTime;
        private boolean genderneutral;
        private boolean free;
        private boolean accessible;
        private String cleanliness;
        private boolean hasPhoto;
        private String openingHours;

        @Column(columnDefinition="text")
        private String infoText;

        private double ratingAverage;
        private String address;

        @NotBlank
        private String city;

        @NotBlank
        private String country;

        // getters and setters

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getLatitude() {
                return latitude;
        }

        public void setLatitude(String latitude) {
                this.latitude = latitude;
        }

        public String getLongitude() {
                return longitude;
        }

        public void setLongitude(String longitude) {
                this.longitude = longitude;
        }

        public String getPostTime() {
                return postTime;
        }

        public void setPostTime(String postTime) {
                LocalDate localDate = LocalDate.now();
                postTime = localDate.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG));
                this.postTime = postTime;
        }

        public boolean isGenderneutral() {
                return genderneutral;
        }

        public void setGenderneutral(boolean genderneutral) {
                this.genderneutral = genderneutral;
        }

        public boolean isFree() {
                return free;
        }

        public void setFree(boolean free) {
                this.free = free;
        }

        public boolean isAccessible() {
                return accessible;
        }

        public void setAccessible(boolean accessible) {
                this.accessible = accessible;
        }

        public String getCleanliness() {
                return cleanliness;
        }

        public void setCleanliness(String cleanliness) {
                this.cleanliness = cleanliness;
        }

        public boolean isHasPhoto() {
                return hasPhoto;
        }

        public void setHasPhoto(boolean hasPhoto) {
                this.hasPhoto = hasPhoto;
        }

        public String getOpeningHours() {
                return openingHours;
        }

        public void setOpeningHours(String openingHours) {
                this.openingHours = openingHours;
        }

        public String getInfoText() {
                return infoText;
        }

        public void setInfoText(String infoText) {
                this.infoText = infoText;
        }

        public double getRatingAverage() {
                return ratingAverage;
        }

        public void setRatingAverage(double ratingAverage) {
                this.ratingAverage = ratingAverage;
        }

        public String getAddress() { return address; }

        public void setAddress(String address) { this.address = address;  }

        public String getCity() {
                return city;
        }

        public void setCity(String city) {
                this.city = city;
        }

        public String getCountry() {
                return country;
        }

        public void setCountry(String country) {
                this.country = country;
        }
}
