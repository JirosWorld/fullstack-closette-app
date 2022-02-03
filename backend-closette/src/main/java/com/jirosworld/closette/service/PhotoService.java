package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.model.NewsPost;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.MalformedURLException;
import java.util.Optional;

@Service
public class PhotoService {
    private PhotoRepository doc;

    @Autowired
    private PhotoRepository photoRepository;

    //    find all
    public Iterable<Photo> findAllPhotos() {
        return photoRepository.findAll();
    }

    public Iterable<Photo> getPhotoposts(String fileName) {
        if (fileName.isEmpty()) {
            return photoRepository.findAll();
        }
        else {
            return (Iterable<Photo>) photoRepository.findByFileName(fileName);
        }
    }

    public Photo findPhoto(Long id) {
        Optional<Photo> optionalPhoto = photoRepository.findById(id);

        if (optionalPhoto.isPresent()) {
            return optionalPhoto.get();
        } else {
            throw new RecordNotFoundException("ID does not exist!");
        }
    }

    public PhotoService(PhotoRepository doc){
        this.doc = doc;
    }

    public Resource downLoadFileDatabase(String fileName) {


        String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFromDB/").path(fileName).toUriString();

        Resource resource;

        try {
            resource = new UrlResource(url);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }

        if(resource.exists()&& resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("This file doesn't exist or is not readable");
        }
    }


}
