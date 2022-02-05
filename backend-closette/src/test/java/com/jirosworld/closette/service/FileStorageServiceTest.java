package com.jirosworld.closette.service;

import com.jirosworld.closette.model.FileUploadResponse;
import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.repository.FileStorageRepository;
import com.jirosworld.closette.repository.PhotoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FileStorageServiceTest {

    @Mock
    FileStorageRepository fileStorageRepository;

    @InjectMocks
    private FileStorageService fileStorageService;

    @Captor
    ArgumentCaptor<FileUploadResponse> fileUploadResponseArgumentCaptor;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoService photoService;

    @Test
    public void getPhotoTest() {
        Photo photo = new Photo();
        photo.setFileName("fototest");
        when(photoRepository.findById(1L)).thenReturn(Optional.of(photo));

        var photo1 =photoService.findPhoto(1L);
        assertThat(photo1.getFileName()).isEqualTo("fototest");
    }

}