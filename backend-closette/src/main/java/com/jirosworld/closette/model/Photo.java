package com.jirosworld.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "photos")
public class Photo {

//    this 'photos' database is meant for Toilets (not for Avatars)

    @Id
    @GeneratedValue
    private Long id;

    private String fileName;

    @Lob
    private byte[] docFile;

    @JsonIgnore
    @OneToMany(mappedBy = "photo", fetch = FetchType.EAGER)
    private List<Toilet> toilets = new ArrayList<>();


    // getters and setters

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

//    convert photo to byte array
    @Lob
    public byte[] getDocFile() {
        return docFile;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setDocFile(byte[] docFile) {
        this.docFile = docFile;
    }

    // getters and setters of relation tables

    public List<Toilet> getToilets() {
        return toilets;
    }

    public void setToilets(List<Toilet> toilets) {
        this.toilets = toilets;
    }

}
