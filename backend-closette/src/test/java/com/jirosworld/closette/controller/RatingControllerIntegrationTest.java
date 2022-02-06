package com.jirosworld.closette.controller;

import com.jirosworld.closette.ClosetteApp;
import com.jirosworld.closette.model.Rating;
import com.jirosworld.closette.service.RatingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.Arrays;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest
@ContextConfiguration(classes={RatingController.class})
@EnableConfigurationProperties
public class RatingControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private RatingService ratingService;

    // ERROR: websecurity error
    @Test
    public void testEndpointRatings() throws Exception {

        Rating rating = new Rating(5, 9);
        List<Rating> allRatings = List.of(rating);

        given(ratingService.findAllRatings()).willReturn(allRatings);

        mvc.perform(get("/ratings")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect((ResultMatcher) jsonPath("$[0].rating", is(rating.getRating())));

    }

}