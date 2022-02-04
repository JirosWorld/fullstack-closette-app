package com.jirosworld.closette.service;

import com.jirosworld.closette.dto.AuthenticationRequestDto;
import com.jirosworld.closette.dto.AuthenticationResponseDto;
import com.jirosworld.closette.ClosetteApp;
import com.jirosworld.closette.config.WebSecurityConfig;
import com.jirosworld.closette.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest(classes = {ClosetteApp.class})
@ExtendWith(SpringExtension.class)
//@SpringBootTest(properties = "spring.main.lazy-initialization=true",
//        classes = {ClosetteApp.class})
@ContextConfiguration(classes={ClosetteApp.class})
@EnableConfigurationProperties
public class UserAuthenticateServiceTest {
    @Autowired
    UserAuthenticateService userAuthenticateService;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    PasswordEncoder passwordEncoder;

    @MockBean
    ToiletService toiletService;

    @MockBean
    JwtUtil jwtUtil;

    @Test
    void authenticateUserTest(){
//        AuthenticationResponseDto expected = new AuthenticationResponseDto("secret");
//
//        Mockito
//                .when(authenticationManager.authenticate(ArgumentMatchers.any()))
//                .thenReturn(null);
////        Mockito
////                .when(userAuthenticateServic.authenticateUser(anyString()))
////                .thenReturn(null);
//        Mockito
//                .when(jwtUtil.generateToken(any()))
//                .thenReturn("testperoon");
//
//        AuthenticationResponseDto actual = userAuthenticateService.authenticateUser(new AuthenticationRequestDto("testpersoon", "test"));
//
//        assertEquals(expected.getJwt(), actual.getJwt());
    }
}
