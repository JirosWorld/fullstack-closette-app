package com.jirosworld.closette.model;

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
//        Object Rating = null;
//        Object Photo = null;
        toilet = new Toilet(20,"Naam van toilet","44.111","6.2222","1-1-2022",true,false,true,"Zeer schoon",true,"van 9 - 18h","Hebban olla vogala nestas hagunnan, hinase hic enda tu","Lutjebroek","Nederland","Marktplein 1-a.");
    }

    @Test
    void getTitle() {
        String actual = toilet.getTitle();
        String expected = "Naam van toilet";

        assertEquals(expected, actual);
    }

    @Test
    void getLatitude() {
        String actual = toilet.getLatitude();
        String expected = "44.111";

        assertEquals(expected, actual);
    }

    @Test
    void getLongitude() {
        String actual = toilet.getLongitude();
        String expected = "6.2222";

        assertEquals(expected, actual);
    }

    @Test
    void isGenderneutral() {
        boolean actual = toilet.isGenderneutral();
        boolean expected = true;

        assertEquals(expected, actual);
    }

    @Test
    void isHasPhoto() {
        boolean actual = toilet.isHasPhoto();
        boolean expected = true;

        assertEquals(expected, actual);
    }

    @Test
    void isFree() {
        boolean actual = toilet.isFree();
        boolean expected = false;

        assertEquals(expected, actual);
    }

    @Test
    void getCity() {
        String actual = toilet.getCity();
        String expected = "Lutjebroek";

        assertEquals(expected, actual);
    }

    @Test
    void getCountry() {
        String actual = toilet.getCountry();
        String expected = "Nederland";

        assertEquals(expected, actual);
    }

    @Test
    void getAddress() {
        String actual = toilet.getAddress();
        String expected = "Marktplein 1-a.";

        assertEquals(expected, actual);
    }

    @AfterEach
    void tearDown() {
    }
}