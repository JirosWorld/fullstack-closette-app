package nl.novi.closette.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue
    private Long id;

    private String fileName;

    @Lob
    private byte[] docFile;

    @OneToMany(mappedBy = "photo", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Toilet> toilets = new ArrayList<>();

    // getters and setters

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

    public void setId(Long id) {
        this.id = id;
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
