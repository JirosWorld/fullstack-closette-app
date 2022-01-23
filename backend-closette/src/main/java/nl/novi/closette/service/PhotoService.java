package nl.novi.closette.service;

import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.Photo;
import nl.novi.closette.repository.PhotoRepository;
import nl.novi.closette.repository.ToiletRepository;
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
            throw new RuntimeException("the file doesn't exist or not readable");
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

}
