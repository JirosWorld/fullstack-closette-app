package com.jirosworld.closette.model;

import javax.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rating;

    // constructors

    public Rating() {
    }

    public Rating(int id, int rating) {
        this.id = id;
        this.rating = rating;
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

}

