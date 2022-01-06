package nl.novi.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

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

    private boolean genderneutral;
    private boolean free;
    private boolean accessible;
    private String cleanliness;
    private boolean hasPhoto;
    private String openingHours;
    private String infoText;
    private double rating;
    private String city;
    private String country;
    private String venue;

//    Handy tip: when giving a co-ordinate, latitude (north or south) always precedes longitude (east or west). Latitude comes first in alphabetical order and it also is the first coordinate in a set.

    @JsonIgnoreProperties("toilets")
    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person owner;

    // voor Spring Boot (JPA) is een constructor niet nodig

    // default constructor
    public Toilet() {}

    public Toilet(String title, String author, String city, String country) {
        this.title = title;
        this.author = author;
        this.city = city;
        this.country = country;
    }

    // full constructor

    public Toilet(int id, String title, String author, String latitude, String longitude, boolean genderneutral, boolean free, boolean accessible, String cleanliness, boolean hasPhoto, String openingHours, String infoText, double rating, String city, String venue, Person owner) {
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
        this.rating = rating;
        this.city = city;
        this.country = country;
        this.venue = venue;
        this.owner = owner;
    }


    // setters and getters

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

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
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

    // getters and setters of relation tables

    public Person getOwner() {
        return owner;
    }

    public void setOwner(Person owner) {
        this.owner = owner;
    }
}
