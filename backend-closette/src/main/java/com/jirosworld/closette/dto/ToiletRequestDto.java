package com.jirosworld.closette.dto;

import com.jirosworld.closette.model.Toilet;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;


public class ToiletRequestDto {

        private int id;

        @NotBlank
        @Size(min=1, max=100)
        public String title;

        @NotBlank
        public String city;

        @NotBlank
        public String country;

        @Size(min=0, max=20, message="latitude is too long, please use a dot.")
        public String latitude;

        @Size(min=0, max=20, message="longitude is too long, please use a dot.")
        public String longitude;

        public String postTime;
        public boolean genderneutral;
        public boolean free;
        public boolean accessible;
        public String cleanliness;
        public boolean hasPhoto;
        public String openingHours;
        public String address;

        @Column(columnDefinition="text")
        public String infoText;


        // getters and setters


        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

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

        // methods

//        public static ToiletRequestDto fromToilet(Toilet toilet) {
//
//                var dto = new ToiletRequestDto();
//
//                dto.id = toilet.getId();
//                dto.title = toilet.getTitle();
//                dto.city = toilet.getCity();
//                dto.country = toilet.getCountry();
//                dto.latitude = toilet.getLatitude();
//                dto.longitude = toilet.getLongitude();
//                dto.postTime = toilet.getPostTime();
//                dto.genderneutral = toilet.isGenderneutral();
//                dto.free = toilet.isFree();
//                dto.accessible = toilet.isAccessible();
//                dto.cleanliness = toilet.getCleanliness();
//                dto.hasPhoto = toilet.isHasPhoto();
//                dto.openingHours = toilet.getOpeningHours();
//                dto.address = toilet.getAddress();
//                dto.infoText = toilet.getInfoText();
//
//                return dto;
//        }
//
//        public ToiletRequestDto toToilet() {
//
//                var toilet = new Toilet();
//
//                toilet.setId(id);
//                toilet.setTitle(title);
//                toilet.setCity(city);
//                toilet.setCountry(country);
//                toilet.setLatitude(latitude);
//                toilet.setLongitude(longitude);
//                toilet.setPostTime(postTime);
//                toilet.setGenderneutral(genderneutral);
//                toilet.setFree(free);
//                toilet.setAccessible(accessible);
//                toilet.setCleanliness(cleanliness);
//                toilet.setHasPhoto(hasPhoto);
//                toilet.setOpeningHours(openingHours);
//                toilet.setAddress(address);
//                toilet.setInfoText(infoText);
//
//                return toilet;
//        }

}
