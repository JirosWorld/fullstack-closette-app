package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.FileStorageException;
import com.jirosworld.closette.model.FileUploadResponse;
import com.jirosworld.closette.repository.FileStorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;

@Service
public class FileStorageService {

    @Value("${app.uploads}")
    private Path fileStoragePath;
    private String fileStorageLocation;

    @Autowired
    private FileStorageRepository filestorageRepository;

    //    find all
    public List<FileUploadResponse> getUploads(String fileName) {
        return filestorageRepository.findAll();
    }

    public FileStorageService(@Value("${app.uploads}") String fileStorageLocation) {
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

        String currentcontentType = StringUtils.cleanPath(file.getContentType());

//
// Windows users moeten hieronder mogelijk een BACKSLASH invoeren in plaats van de SLASH die hier staat, resultaat:
// Path filePath = Paths.get(fileStoragePath + "\\" + fileName);
// soms is hier zelfs een path nodig met TWEE Backslashes naastelkaar: "\\"
// Path filePath = Paths.get(fileStoragePath + "\\" + fileName);
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

        FileUploadResponse newFileToStore = new FileUploadResponse();
        newFileToStore.setFileName(fileName);
        newFileToStore.setUrl(filePath.toString());
        newFileToStore.setContentType(currentcontentType);

        FileUploadResponse saved = filestorageRepository.save(newFileToStore);

//        return fileName + saved.getId();
            return saved.getFileName();
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

}
