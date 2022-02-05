package com.jirosworld.closette.service;

import com.jirosworld.closette.exception.RecordNotFoundException;
import com.jirosworld.closette.model.NewsPost;
import com.jirosworld.closette.repository.NewsPostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NewsPostServiceTest {

    @Mock
    NewsPostRepository NewsPostRepository;

    @InjectMocks
    private NewsPostService NewsPostService;

    @Captor
    ArgumentCaptor<NewsPost> NewsPostCaptor;

    @Test
    public void getNewsPostTest() {
        NewsPost NewsPost = new NewsPost();
        NewsPost.setTitle("Nieuwsbericht titel");
        when(NewsPostRepository.findById(1)).thenReturn(Optional.of(NewsPost));

        var NewsPost1 =NewsPostService.getPost(1);
        assertThat(NewsPost1.getTitle()).isEqualTo("Nieuwsbericht titel");
    }


    @Test
    public void getNewsPostsTest() {
        List<NewsPost> testNewsPosts = new ArrayList<>();
        NewsPost NewsPost1 = new NewsPost();
        NewsPost1.setId(1);
        NewsPost1.setTitle("Nieuwsbericht titel 1");
        NewsPost NewsPost2 = new NewsPost();
        NewsPost2.setId(2);
        NewsPost2.setTitle("Nieuwsbericht titel 2");
        NewsPost NewsPost3 = new NewsPost();
        NewsPost3.setId(3);
        NewsPost3.setTitle("3e Nieuwsbericht titel test");

        testNewsPosts.add(NewsPost1);
        testNewsPosts.add(NewsPost2);
        testNewsPosts.add(NewsPost3);

        when(NewsPostRepository.findAll()).thenReturn(testNewsPosts);

        NewsPostService.findAllNewsposts();

        verify(NewsPostRepository, times(1)).findAll();

        assertThat(testNewsPosts.size()).isEqualTo(3);
        assertThat(testNewsPosts.get(0)).isEqualTo(NewsPost1);
        assertThat(testNewsPosts.get(1)).isEqualTo(NewsPost2);
        assertThat(testNewsPosts.get(2)).isEqualTo(NewsPost3);
    }


    @Test
    public void saveNewsPostTest() {
        NewsPost NewsPost = new NewsPost();
        NewsPost.setId(1);
        NewsPost.setTitle("test");

        NewsPostRepository.save(NewsPost);

        verify(NewsPostRepository, times(1)).save(NewsPostCaptor.capture());
        var NewsPost1 = NewsPostCaptor.getValue();

        assertThat(NewsPost1.getTitle()).isEqualTo("test");
        assertThat(NewsPost1.getId()).isEqualTo(1);
    }


    @Test
    public void updateNewsPostTest() {
        NewsPost NewsPost1 = new NewsPost();
        NewsPost1.setId(1);
        NewsPost1.setTitle("test");
        when(NewsPostRepository.findById(1)).thenReturn(Optional.of(NewsPost1));

        NewsPost1.setTitle("test1");
        NewsPostService.updatePost(1, NewsPost1);

        verify(NewsPostRepository).save(NewsPost1);

        assertThat(NewsPost1.getId()).isEqualTo(1);
        assertThat(NewsPost1.getTitle()).isEqualTo("test1");
    }

//    @Test
//    public void updateNewsPostExceptionTest() {
//        assertThrows(RecordNotFoundException.class, () -> NewsPostService.getNewsposts(null));
//    }

    @Test
    public void deleteNewsPostTest() {
        NewsPost NewsPost1 = new NewsPost();
        NewsPost1.setId(1);
        NewsPost1.setTitle("test");

        NewsPostRepository.delete(NewsPost1);

        NewsPostService.deletePost(1);

        verify(NewsPostRepository, times(1)).delete(NewsPost1);
    }
}