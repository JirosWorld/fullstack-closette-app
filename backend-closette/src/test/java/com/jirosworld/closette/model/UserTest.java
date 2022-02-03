package com.jirosworld.closette.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {
    private User user;
    private String authority;

    @BeforeEach
    void setup(){
         user = new User();
    }

    @Test
    void setRoleSetsAuthority(){
        user.setUsername("tester");
        user.addAuthority("ROLE_ADMIN");
        Authority expected = new Authority("tester", "ROLE_ADMIN");
        Authority actual = user.getAuthorities().iterator().next();
        assertEquals(expected.getAuthority(), actual.getAuthority());
        assertEquals(expected.getUsername(), actual.getUsername());
    }
}
