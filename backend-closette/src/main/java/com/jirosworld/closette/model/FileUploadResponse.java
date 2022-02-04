package com.jirosworld.closette.model;

import javax.persistence.*;

@Entity
@Table(name = "uploaded_files")
public class FileUploadResponse {

//    this 'uploaded_files' database is meant for Avatars (not for Toilets)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String fileName;

    private String contentType;

    private String url;

    public FileUploadResponse(String fileName, String contentType, String url) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.url = url;
    }

    public FileUploadResponse(long id, String fileName, String url) {
        this.id = id;
        this.fileName = fileName;
        this.url = url;
    }

    public FileUploadResponse() {

    }

    // getters and setters


    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
