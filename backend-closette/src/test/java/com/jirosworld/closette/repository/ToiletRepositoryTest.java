package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.Toilet;
import com.jirosworld.closette.model.Rating;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class ToiletRepositoryTest {

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    ToiletRepository toiletRepository;


    @Test
    public void findAllByToiletTest(){
        Toilet toilet = new Toilet();
        toilet.setInfoText("testing");
        toilet.setGenderneutral(true);
        Toilet toilet1 = new Toilet();
        toilet1.setGenderneutral(true);
        toilet1.setInfoText("not testing");
        Toilet toilet2 = toilet;
        entityManager.persist(toilet);
        entityManager.persist(toilet1);
        entityManager.flush();

        List<Toilet> actual = toiletRepository.findAllByGenderneutral(true);

        assertEquals("testing", actual.get(0).getInfoText());
    }

    @Test
    public void findAllByRating(){
        Rating rating = new Rating();
        rating.setRating(5);
        Toilet toilet = new Toilet();
//        toilet.setRatings([4,5,6;]);
        toilet.setInfoText("testing");
        entityManager.persist(rating);
        entityManager.persist(toilet);
        entityManager.flush();

        List<Toilet> actual = toiletRepository.findAll();

        assertEquals("testing", actual.get(0).getInfoText());
    }
}