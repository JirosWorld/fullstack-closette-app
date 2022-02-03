package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.repository.ToiletRepository;
import com.jirosworld.closette.service.ToiletService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ToiletServiceTest {

    @Mock
    ToiletRepository toiletRepository;

    @InjectMocks
    private ToiletService toiletService;

    @Captor
    ArgumentCaptor<Toilet> toiletCaptor;

    @Test
    public void getToiletTest() {
        Toilet toilet = new Toilet();
        toilet.setTitle("test");
        when(toiletRepository.findById(1)).thenReturn(Optional.of(toilet));

        var toilet1 =toiletService.getToilet(1);
        assertThat(toilet1.getTitle()).isEqualTo("test");
    }

//    @Test
//    public void getToiletExceptionTest() {
////        assertThrows(RecordNotFoundException.class, () -> toiletService.getToilet(null));
//        String title = "Naam exception";
//
//        // Setup our mock repository
//        Mockito
//                .doReturn(null).when(toiletRepository)
//                .findAllByTitle(title);
//
//        // Execute the service call
//        Toilet found = (Toilet) toiletService.getToiletsByTitle(title);
//
//        // Assert the response
//        assertNull(found, "Widget should not be found");
//    }

    @Test
    public void getToiletsTest() {
        List<Toilet> testToilets = new ArrayList<>();
        Toilet toilet1 = new Toilet();
        toilet1.setId(1);
        toilet1.setTitle("Naam test 1");
        Toilet toilet2 = new Toilet();
        toilet2.setId(2);
        toilet2.setTitle("Testnaam 2");
        Toilet toilet3 = new Toilet();
        toilet3.setId(3);
        toilet3.setTitle("3e naam test");

        testToilets.add(toilet1);
        testToilets.add(toilet2);
        testToilets.add(toilet3);

        when(toiletRepository.findAll()).thenReturn(testToilets);

        toiletService.getToilets();

        verify(toiletRepository, times(1)).findAll();

        assertThat(testToilets.size()).isEqualTo(3);
        assertThat(testToilets.get(0)).isEqualTo(toilet1);
        assertThat(testToilets.get(1)).isEqualTo(toilet2);
        assertThat(testToilets.get(2)).isEqualTo(toilet3);
    }


    @Test
    public void saveToiletTest() {
        Toilet toilet = new Toilet();
        toilet.setId(1);
        toilet.setTitle("test");

        toiletRepository.save(toilet);

        verify(toiletRepository, times(1)).save(toiletCaptor.capture());
        var toilet1 = toiletCaptor.getValue();

        assertThat(toilet1.getTitle()).isEqualTo("test");
        assertThat(toilet1.getId()).isEqualTo(1);
    }


    @Test
    public void updateToiletTest() {
        Toilet toilet1 = new Toilet();
        toilet1.setId(1);
        toilet1.setTitle("test");
        when(toiletRepository.findById(1)).thenReturn(Optional.of(toilet1));

        toilet1.setTitle("test1");
        toiletService.updateToilet(1, toilet1);

        verify(toiletRepository).save(toilet1);

        assertThat(toilet1.getId()).isEqualTo(1);
        assertThat(toilet1.getTitle()).isEqualTo("test1");
    }

//    @Test
//    public void updateToiletExceptionTest() {
//        assertThrows(RecordNotFoundException.class, () -> toiletService.getToilet(null));
//    }

//    @Test
//    public void deleteToiletTest() {
//        Toilet toilet1 = new Toilet();
//        toilet1.setId(1);
//        toilet1.setTitle("test");
//
//        toiletRepository.delete(toilet1);
//
//        toiletService.deleteToilet(1);
//
//        verify(toiletRepository, times(1)).delete(toilet1);
//    }
}