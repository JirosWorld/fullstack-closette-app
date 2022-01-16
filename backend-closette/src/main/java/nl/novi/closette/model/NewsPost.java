package nl.novi.closette.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Entity
@Table(name = "newsposts")
public class NewsPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private String paragraph;
    private String postTime;

    @JsonIgnoreProperties("newsposts")
    @ManyToOne
    @JoinColumn(name = "newsauthor_id", referencedColumnName = "username")
    private User newsauthor;

    public NewsPost() {
    }

    // full constructor
    public NewsPost(int id, String title, String author, String description, String paragraph, String postTime, User newsauthor) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.paragraph = paragraph;
        this.postTime = postTime;
        this.newsauthor = newsauthor;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getParagraph() {
        return paragraph;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
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

    public User getNewsauthor() {
        return newsauthor;
    }

    public void setNewsauthor(User newsauthor) {
        this.newsauthor = newsauthor;
    }

    // toString

    @Override
    public String toString() {
        return "NewsPost{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", paragraph='" + paragraph + '\'' +
                ", postTime='" + postTime + '\'' +
                ", newsauthor=" + newsauthor +
                '}';
    }
}