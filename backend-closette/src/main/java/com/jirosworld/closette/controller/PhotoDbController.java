package com.jirosworld.closette.controller;

import com.jirosworld.closette.model.FileUploadResponse;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.repository.PhotoRepository;
import com.jirosworld.closette.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


@RestController
public class PhotoDbController {

    private PhotoRepository photoRepository;
    private PhotoService databaseService;

    @Autowired
    private PhotoService photoService;

    public PhotoDbController(PhotoRepository photoRepository, PhotoService databaseService) {
        this.databaseService = databaseService;
        this.photoRepository = photoRepository;
    }

    // mappings

    @GetMapping(value = "/photos/{id}")
    public ResponseEntity<Object> findPhoto(@PathVariable Long id) {
        return ResponseEntity.ok(photoService.findPhoto(id));
    }

    @GetMapping(value = "/photos")
    public ResponseEntity<Object> getPhotos(@RequestParam(name="fileName", defaultValue="") String fileName) {
        return ResponseEntity.ok(photoService.getPhotoposts(fileName));
    }

    @PostMapping("single/uploadDb")
    FileUploadResponse singleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {

        String name = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo();
        photo.setFileName(name);
        photo.setDocFile(file.getBytes());

        photoRepository.save(photo);

        // makes url
        String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFromDB/").path(name).toUriString();

        String contentType = file.getContentType();

        FileUploadResponse response = new FileUploadResponse(name, contentType, url);

        return response;
    }


    @GetMapping("/downloadFromDB/{fileName}")
    ResponseEntity<byte[]> downLoadSingleFile(@PathVariable String fileName, HttpServletRequest request) {

        Photo doc = photoRepository.findByFileName(fileName);

//        for accepting multiple file types
        String mimeType = request.getServletContext().getMimeType(doc.getFileName());

//        for showing image in browser:
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType)).header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + doc.getFileName()).body(doc.getDocFile());
    }



    // function to make patching possible
    @PatchMapping(value = "single/uploadDb/{id}")
    public FileUploadResponse singleFileUploadPatch(@RequestParam("file") MultipartFile file, @PathVariable Long id) throws IOException {
//        FileStorageService.partialUpdatePhotoDb(id, photo);
        String name = StringUtils.cleanPath(file.getOriginalFilename());
        Photo photo = new Photo();
        photo.setFileName(name);
        photo.setDocFile(file.getBytes());
        photo.setId(id);

        photoRepository.save(photo);

        String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFromDB/").path(name).toUriString();

        String contentType = file.getContentType();

        FileUploadResponse response = new FileUploadResponse(name, contentType, url);

        return response;
//        return ResponseEntity.noContent().build();
    }



//    relation tables

//    @GetMapping(value = "/photos/{id}/toilets")
//    public ResponseEntity<Object> getPhotoToilet(@PathVariable int id) {
//        return ResponseEntity.ok(photoService.getPhotoToilet(id));
//    }



//    @PostMapping(value = "/photos/{id}/toilets")
//    public ResponseEntity<Object> addPhotoToilet(@PathVariable int id, @RequestBody Toilet toilet) {
//        photoService.addPhotoToilet(id, toilet);
//        return ResponseEntity.created(null).build();
//    }


}
