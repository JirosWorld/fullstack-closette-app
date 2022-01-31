package com.jirosworld.closette.dto;

import javax.persistence.*;


public class PhotoRequestDto {

    private String fileName;

    @Lob
    private byte[] docFile;


    // getters and setters

    public String getFileName() {
        return fileName;
    }

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

}
