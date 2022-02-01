package com.jirosworld.closette.model;

import javax.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int ratingToilet;

    // constructors

    public Rating() {
    }

    public Rating(int id, int ratingToilet) {
        this.id = id;
        this.ratingToilet = ratingToilet;
    }

    public Rating(int ratingToilet) {
        this.ratingToilet = ratingToilet;
    }

    // getters and setters

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

