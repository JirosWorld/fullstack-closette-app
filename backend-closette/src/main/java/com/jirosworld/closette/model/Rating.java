package com.jirosworld.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rating;


    @JsonIgnoreProperties("ratings")
    @ManyToOne
    @JoinColumn(name = "toilet_id", referencedColumnName = "id")
    private Toilet toilet;


    @JsonIgnoreProperties("ratings")
    @ManyToOne
    @JoinColumn(name = "user_username", referencedColumnName = "username")
    private User user;


    // constructors

    public Rating() {
    }

    public Rating(int id, int rating) {
        this.id = id;
        this.rating = rating;
    }

    public Rating(int id, int rating, Toilet toilet, User user) {
        this.id = id;
        this.rating = rating;
        this.toilet = toilet;
        this.user = user;
    }

    public Rating(int id, int rating, Toilet toilet) {
        this.id = id;
        this.rating = rating;
        this.toilet = toilet;
    }

    public Rating(int rating) {
        this.rating = rating;
    }

    // getters and setters

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

    // relation tables

    public Toilet getToilet() {
        return toilet;
    }

    public void setToilet(Toilet toilet) {
        this.toilet = toilet;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

