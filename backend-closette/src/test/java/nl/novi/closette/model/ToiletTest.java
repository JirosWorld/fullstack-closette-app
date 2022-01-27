package nl.novi.closette.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ToiletTest {

    Toilet toilet;

    @BeforeAll
    static void setupAll() {
    }

    @BeforeEach
    void setupEach() {
        Object Rating = null;
        Object Photo = null;
        toilet = new Toilet(20,"Naam van toilet","44.111","6.2222","1-1-2022",true,false,true,"Zeer schoon",true,"van 9 - 18h","Hebban olla vogala nestas hagunnan, hinase hic enda tu",7.3,"Lutjebroek","Nederland","Marktplein 1-a, ", (nl.novi.closette.model.Rating) Rating, (nl.novi.closette.model.Photo) Photo);
    }

    @Test
    void getTitle() {
        String actual = toilet.getTitle();
        String expected = "Naam van toilet";

        assertEquals(expected, actual);
    }

    @Test
    void isGenderneutral() {
        boolean actual = toilet.isGenderneutral();
        boolean expected = true;

        assertEquals(expected, actual);
    }

    @AfterEach
    void tearDown() {
    }
}