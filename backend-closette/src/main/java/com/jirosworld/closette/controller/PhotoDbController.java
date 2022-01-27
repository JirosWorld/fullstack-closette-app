package com.jirosworld.closette.controller;

import com.jirosworld.closette.model.FileUploadResponse;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.repository.PhotoRepository;
import com.jirosworld.closette.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


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

        // next line makes url. example "http://localhost:8080/download/naam.jpg"
        String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFromDB/").path(name).toUriString();

        String contentType = file.getContentType();

        FileUploadResponse response = new FileUploadResponse(name, contentType, url);

        return response;
    }

    //    get for single download
    @GetMapping("/downloadFromDB/{fileName}")
    ResponseEntity<byte[]> downLoadSingleFile(@PathVariable String fileName, HttpServletRequest request) {

        Photo doc = photoRepository.findByFileName(fileName);

//        this is going to accept multiple file types

        String mimeType = request.getServletContext().getMimeType(doc.getFileName());

//        for download attachment use next line
//        return ResponseEntity.ok().contentType(contentType).header(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName=" + resource.getFilename()).body(resource);
//        for showing image in browser
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType)).header(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + doc.getFileName()).body(doc.getDocFile());
    }

    //    post for multiple uploads to database
    @PostMapping("/multiple/upload/db")
    List<FileUploadResponse> multipleUpload(@RequestParam("files") MultipartFile[] files) {

        if (files.length > 7) {
            throw new RuntimeException("to many files selected");
        }

        List<FileUploadResponse> uploadResponseList = new ArrayList<>();
        Arrays.asList(files).stream().forEach(file -> {

            String name = StringUtils.cleanPath(file.getOriginalFilename());
            Photo photo = new Photo();
            photo.setFileName(name);
            try {
                photo.setDocFile(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }

            photoRepository.save(photo);

//            next line makes url. example "http://localhost:8080/download/naam.jpg"
            String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFromDB/").path(name).toUriString();

            String contentType = file.getContentType();

            FileUploadResponse response = new FileUploadResponse(name, contentType, url);

            uploadResponseList.add(response);
        });

        return uploadResponseList;

    }

    @GetMapping("zipDownload/db")
    public void zipDownload(@RequestParam("fileName") String[] files, HttpServletResponse response) throws IOException {


        try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())) {
            Arrays.asList(files).stream().forEach(file -> {
                Resource resource = databaseService.downLoadFileDatabase(file);
                ZipEntry zipEntry = new ZipEntry(resource.getFilename());
                try {
                    zipEntry.setSize(resource.contentLength());
                    zos.putNextEntry(zipEntry);

                    StreamUtils.copy(resource.getInputStream(), zos);

                    zos.closeEntry();
                } catch (IOException e) {
                    System.out.println("some exception while zipping");
                }
            });
            zos.finish();
        }

        response.setStatus(200);
        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;fileName=zipfile");
    }

    // function to make patching possible
//    @PatchMapping(value = "single/uploadDb/{id}")
//    public FileUploadResponse singleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
//        FileStorageService.partialUpdatePhotoDb(id, photo);
//
//        return ResponseEntity.noContent().build();
//    }


}
