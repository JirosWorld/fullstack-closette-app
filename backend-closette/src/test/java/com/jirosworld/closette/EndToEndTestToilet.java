package com.jirosworld.closette;

import com.jirosworld.closette.ClosetteApp;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//@SpringBootTest(properties = "spring.main.lazy-initialization=true",
//        classes = {ClosetteApp.class})
@SpringBootTest(classes = {ClosetteApp.class})
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@EnableConfigurationProperties
class EndToEndTestToilet {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturn200() throws Exception {
        mockMvc.perform(get("/toilets"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnJson() throws Exception {

        mockMvc.perform(get("/toilets").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    }

//    @Test
//    void shouldReturnRecords() throws Exception {
//
//        mockMvc.perform(get("/toilets").contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(4)))
//                .andExpect(jsonPath("$[0].title", startsWith("A")));
//
//    }
}