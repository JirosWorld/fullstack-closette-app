package com.jirosworld.closette.model;

import javax.persistence.*;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue
    private Long id;

    private String fileName;

    @Lob
    private byte[] docFile;

//    @JsonIgnore
    @OneToOne(mappedBy = "photo", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Toilet toilet;


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

//    @Column(length = 16000000) // This should generate a medium blob
//    @Basic(fetch = FetchType.LAZY)
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

    public Toilet getToilet() {
        return toilet;
    }

    public void setToilet(Toilet toilet) {
        this.toilet = toilet;
    }

}
