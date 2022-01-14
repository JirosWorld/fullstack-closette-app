package nl.novi.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Entity
@Table(name = "toilets")
public class Toilet {

    // attributen

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String author;
    private String latitude;
    private String longitude;
    private String postTime;

    private boolean genderneutral;
    private boolean free;
    private boolean accessible;
    private String cleanliness;
    private boolean hasPhoto;
    private String openingHours;
    private String infoText;
    private double ratingAverage;
    private String city;
    private String country;
    private String venue;

//    Handy tip: when giving a co-ordinate, latitude (north or south) always precedes longitude (east or west). Latitude comes first in alphabetical order and it also is the first coordinate in a set.

    @JsonIgnoreProperties("toilets")
    @ManyToOne
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    private Rating owner;

    public Toilet() {}

    public Toilet(String title, String author, String city, String country, String postTime) {
        this.title = title;
        this.author = author;
        this.city = city;
        this.country = country;
        this.postTime = postTime;
    }

    // full constructor

    public Toilet(int id, String title, String author, String latitude, String longitude, boolean genderneutral, boolean free, boolean accessible, String cleanliness, boolean hasPhoto, String openingHours, String infoText, double ratingAverage, String city, String venue, Rating owner) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.latitude = latitude;
        this.longitude = longitude;
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
        this.venue = venue;
        this.owner = owner;
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

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
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


    @Override
    public String toString() {
        return "Toilet{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", postTime='" + postTime + '\'' +
                ", genderneutral=" + genderneutral +
                ", free=" + free +
                ", accessible=" + accessible +
                ", cleanliness='" + cleanliness + '\'' +
                ", hasPhoto=" + hasPhoto +
                ", openingHours='" + openingHours + '\'' +
                ", infoText='" + infoText + '\'' +
                ", ratingAverage=" + ratingAverage +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", venue='" + venue + '\'' +
                ", owner=" + owner +
                '}';
    }
}
