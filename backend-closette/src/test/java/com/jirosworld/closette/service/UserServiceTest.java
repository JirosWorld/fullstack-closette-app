package com.jirosworld.closette.service;


import com.jirosworld.closette.ClosetteApp;
import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.model.Authority;
import com.jirosworld.closette.model.User;
import com.jirosworld.closette.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest()
@ContextConfiguration(classes={ClosetteApp.class})
@EnableConfigurationProperties
public class UserServiceTest {
    @Autowired
    UserService userService;

    @MockBean
    UserRepository userRepository;

    User user;
    Set<Authority> auth;
    @BeforeEach
    void setup(){
        auth = new HashSet<>();
        auth.add(new Authority("testpersoon", "ROLE_ADMIN"));
        user = new User();

    }

    @Test
    void getAllReturnsUserList(){
        List<User> users = new ArrayList<>();
        users.add(user);

        Mockito
                .when(userRepository.findAll())
                .thenReturn(users);

        List<User> actual = (List<User>) userService.getUsers();
        assertEquals(users, actual);
    }

//    @Test
//    void getByUsernameReturnsUser(){
//        Mockito
//                .when(userRepository.getById(anyString()))
//                .thenReturn(user);
//        Optional<User> actual = userService.getUser("testpersoon");
//
//        assertEquals("testpersoon", actual.getUsername());
//    }

}
