package com.jirosworld.closette;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(classes = ClosetteApp.class, loader = AnnotationConfigContextLoader.class)
//@SpringBootTest(properties = "spring.main.lazy-initialization=true",
//        classes = {ClosetteApp.class})
//@SpringBootTest(classes = ClosetteApp.class)
@SpringBootTest(classes = {ClosetteApp.class})
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@EnableConfigurationProperties

public class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturn200ForEndpointUsers() throws Exception {
        mockMvc.perform(get("/users").with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn200ForEndpointToilets() throws Exception {
        mockMvc.perform(get("/toilets").with(user("user").roles("USER")))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn200ForEndpointNewsPosts() throws Exception {
        mockMvc.perform(get("/news").with(user("user").roles("USER")))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn200ForEndpointPhotos() throws Exception {
        mockMvc.perform(get("/photos").with(user("user").roles("USER")))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturn200ForEndpointRatings() throws Exception {
        mockMvc.perform(get("/ratings").with(user("user").roles("USER")))
                .andExpect(status().isOk());
    }

}
