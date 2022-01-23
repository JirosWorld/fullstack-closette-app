package nl.novi.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Entity
@Table(name = "toilets")
public class Toilet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String latitude;
    private String longitude;
    //    latitude (north or south) always precedes longitude (east or west).
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
    private String city;
    private String country;
    private String address;
//    private boolean public; <= is the location publicly accessible

    @JsonIgnoreProperties("toilets")
    @ManyToOne
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    private Rating owner;

    @JsonIgnoreProperties("toilets")
    @ManyToOne
    @JoinColumn(name = "photo_id", referencedColumnName = "id")
    private Photo photo;

    // constructor

    public Toilet(int id, String title, String latitude, String longitude, String postTime, boolean genderneutral, boolean free, boolean accessible, String cleanliness, boolean hasPhoto, String openingHours, String infoText, double ratingAverage, String city, String country, String address, Rating owner, Photo photo) {
        this.id = id;
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postTime = postTime;
        this.genderneutral = genderneutral;
        this.free = free;
        this.accessible = accessible;
        this.cleanliness = cleanliness;
        this.hasPhoto = hasPhoto;
        this.openingHours = openingHours;
        this.infoText = infoText;
        this.ratingAverage = ratingAverage;
        this.city = city;
        this.country = country;
        this.address = address;
    }

    public Toilet() {

    }

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

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

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

    public String getPostTime() {
        return postTime;
    }

    public void setPostTime(String postTime) {
        LocalDate localDate = LocalDate.now();
        postTime = localDate.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG));
        this.postTime = postTime;
    }

    // getters and setters of relation tables

    public Rating getOwner() {
        return owner;
    }

    public void setOwner(Rating owner) {
        this.owner = owner;
    }

    public Photo getPhoto() {
        return photo;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }
}
