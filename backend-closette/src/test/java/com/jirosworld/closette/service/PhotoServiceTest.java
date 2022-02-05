package com.jirosworld.closette.service;

import com.jirosworld.closette.model.Photo;
import com.jirosworld.closette.repository.PhotoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PhotoServiceTest {

    @Mock
    PhotoRepository photoRepository;

    @InjectMocks
    private PhotoService photoService;

    @Captor
    ArgumentCaptor<Photo> photoCaptor;

    @Test
    public void getPhotoTest() {
        Photo photo = new Photo();
        photo.setFileName("fototest");
        when(photoRepository.findById(1L)).thenReturn(Optional.of(photo));

        var photo1 =photoService.findPhoto(1L);
        assertThat(photo1.getFileName()).isEqualTo("fototest");
    }


    @Test
    public void getPhotosTest() {
        List<Photo> testPhotos = new ArrayList<>();
        Photo photo1 = new Photo();
        photo1.setId(1L);
        photo1.setFileName("Foto 1");
        Photo photo2 = new Photo();
        photo2.setId(2L);
        photo2.setFileName("Foto 2");
        Photo photo3 = new Photo();
        photo3.setId(3L);
        photo3.setFileName("Foto 3");

        testPhotos.add(photo1);
        testPhotos.add(photo2);
        testPhotos.add(photo3);

        when(photoRepository.findAll()).thenReturn(testPhotos);

        photoService.findAllPhotos();

        verify(photoRepository, times(1)).findAll();

        assertThat(testPhotos.size()).isEqualTo(3);
        assertThat(testPhotos.get(0)).isEqualTo(photo1);
        assertThat(testPhotos.get(1)).isEqualTo(photo2);
        assertThat(testPhotos.get(2)).isEqualTo(photo3);
    }

}