package nl.novi.closette.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ratings")
public class Rating {

    // attributen

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
//    private int ratingToilet;
//    private String ratingUser;
//    private List<Integer> ratingsList = new ArrayList<>();

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Toilet> toilets = new ArrayList<>();

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

    public List<Toilet> getToilets() {
        return toilets;
    }

    public void setToilets(List<Toilet> toilets) {
        this.toilets = toilets;
    }
}
