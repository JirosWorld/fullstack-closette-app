package com.jirosworld.closette.repository;

import com.jirosworld.closette.ClosetteApp;
import com.jirosworld.closette.model.Toilet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.assertEquals;


@DataJpaTest
@ContextConfiguration(classes={ClosetteApp.class})
@EnableConfigurationProperties
class ToiletRepositoryIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ToiletRepository toiletRepository;

    @Test
    void testFindByToiletVenueName() {
        // given
        Toilet toilet = new Toilet(20,"Naam van repotoilet","44.111","6.2222","1-1-2022",true,false,true,"Zeer schoon",true,"van 9 - 18h","Hebban olla vogala nestas hagunnan, hinase hic enda tu","Lutjebroek","Antarctica","Marktplein 1-a.");
        entityManager.persist(toilet);
        entityManager.flush();

        // when
        Toilet found = toiletRepository.findByTitle("Naam van repotoilet");

        // then
        String expected = "Naam van repotoilet";
        String actual = found.getTitle();

        assertEquals(expected, actual);
    }

}