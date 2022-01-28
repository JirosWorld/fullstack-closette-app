package com.jirosworld.closette.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ratings")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double ratingToilet;

    private String name;
//    private String ratingUser;
//    private List<Integer> ratingsList = new ArrayList<>();

    @OneToMany(mappedBy = "reviewer", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Toilet> toilets = new ArrayList<>();

    // constructor


    public Rating() {
    }

    public Rating(int id, double ratingToilet, String name, List<Toilet> toilets) {
        this.id = id;
        this.ratingToilet = ratingToilet;
        this.name = name;
        this.toilets = toilets;
    }


    // getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRatingToilet() {
        return ratingToilet;
    }

    public void setRatingToilet(double ratingToilet) {
        this.ratingToilet = ratingToilet;
    }

    public List<Toilet> getToilets() {
        return toilets;
    }

    public void setToilets(List<Toilet> toilets) {
        this.toilets = toilets;
    }
}

