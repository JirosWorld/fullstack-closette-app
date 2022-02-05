package com.jirosworld.closette.service;

import com.jirosworld.closette.ClosetteApp;
import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.repository.ToiletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes={ClosetteApp.class})
@EnableConfigurationProperties
public class ToiletServiceIntegrationTest {

    @Autowired
    private ToiletService toiletService;

    @MockBean
    private ToiletRepository toiletRepository;

    @Mock
    Toilet toilet;

    @BeforeEach
    public void setUp() {
    }

    @Test
    public void testGetToiletByName() {
        toilet = new Toilet(20,"Naam van toilet","44.111","6.2222","1-1-2022",true,false,true,"Zeer schoon",true,"van 9 - 18h","Hebban olla vogala nestas hagunnan, hinase hic enda tu","Lutjebroek","Nederland","Marktplein 1-a.");

        Mockito
                .when(toiletRepository.findAllByTitle("Naam van toilet"))
                .thenReturn((List<Toilet>) toilet);

        String title = "Naam van toilet";
        String expected = "Naam van toilet";

        Toilet found = toiletService.getToiletByTitle(title);

        assertEquals(expected, found.getTitle());
    }

    @Test
    public void testGetToiletByCityname() {
        toilet = new Toilet(20,"Naam van toilet","44.111","6.2222","1-1-2022",true,false,true,"Zeer schoon",true,"van 9 - 18h","Hebban olla vogala nestas hagunnan, hinase hic enda tu","Lutjebroek","Nederland","Marktplein 1-a.");

        Mockito
                .doReturn(toilet)
                .when(toiletRepository)
                .findAllByCityContainingIgnoreCase("Lutjebroek");

        String name = "Lutjebroek";
        String expected = "Lutjebroek";

        Toilet found = (Toilet) toiletService.getToiletsByCity(name);

        assertEquals(expected, found.getCity());
    }

    @Test
    void testGetToiletByNameNotFound() {
        String name = "Niet bestaande locatienaam";

        // Setup our mock repository
        Mockito
                .doReturn(null).when(toiletRepository)
                .findAllByTitle(name);

        // Execute the service call
        Toilet found = toiletService.getToiletByTitle(name);

        // Assert the response
        assertNull(found, "This one should not be found");
    }


}
