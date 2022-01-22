package nl.novi.closette.service;

import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.Photo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
public class FileStorageService {

    @Value("${my.upload_location}")
    private Path fileStoragePath;
    private String fileStorageLocation;

    public FileStorageService(@Value("${my.upload_location}") String fileStorageLocation) {
        fileStoragePath = Paths.get(fileStorageLocation).toAbsolutePath().normalize();

        this.fileStorageLocation = fileStorageLocation;

        try {
            Files.createDirectories(fileStoragePath);
        } catch (IOException e) {
            throw new RuntimeException("Problem in creating file directory");
        }

    }

    public String storeFile(MultipartFile file) {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

//
// Windows users moeten hier mogelijk een BACKSLASH invoeren in plaats van de SLASH die hier staat
// voor sommige Windows gebruikers is hier zelfs een path nodig met TWEE Backslashes naastelkaar: "\\"
//

        Path filePath = Paths.get(fileStoragePath + "/" + fileName);

//
// het pad hierboven kan problemen geven bij Windows users, Mac users zijn veilig.
//

        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Issue in storing the file", e);
        }

        return fileName;
    }

    public Resource downLoadFile(String fileName) {

        Path path = Paths.get(fileStorageLocation).toAbsolutePath().resolve(fileName);

        Resource resource;

        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("Problem in reading the file", e);
        }

        if(resource.exists()&& resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("The file doesn't exist or not readable");
        }
    }

    // function to make patching possible
//    public void partialUpdatePhotoDb(int id, Photo photo) {
//        Optional<Photo> optionalPhoto = photoRepository.findById(id);
//
//        if (optionalPhoto.isPresent()) {
//            Photo storedPhoto = photoRepository.findById(id).orElse(null);
//
//            if (photo.getDocFile() != null && !photo.getDocFile().isEmpty()) {
//                storedPhoto.setDocFile(photo.getDocFile());
//            }
//            if (photo.getFileName() != null && !photo.getFileName().isEmpty()) {
//                storedPhoto.setFileName(photo.getFileName());
//            }
//            photoRepository.save(storedPhoto);
//
//        } else {
//            throw new RecordNotFoundException("ID does not exist!!!");
//        }
//    }


}
