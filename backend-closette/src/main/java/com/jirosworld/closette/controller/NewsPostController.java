package com.jirosworld.closette.controller;

import com.jirosworld.closette.dto.NewsPostRequestDto;
import com.jirosworld.closette.model.NewsPost;
import com.jirosworld.closette.service.NewsPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
public class NewsPostController {

    @Autowired
    private NewsPostService newsPostService;

    @GetMapping(value = "/news")
    public ResponseEntity<Object> getNewsPosts(@RequestParam(name="title", defaultValue="") String title) {
        return ResponseEntity.ok(newsPostService.getNewsposts(title));
    }

    @GetMapping(value = "/news/{id}")
    public ResponseEntity<Object> getNewsPost(@PathVariable int id) {
        return ResponseEntity.ok(newsPostService.getPost(id));
    }

    @DeleteMapping(value = "/news/{id}")
    public ResponseEntity<Object> deleteNewsPost(@PathVariable("id") int id) {
        newsPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/news")
    public ResponseEntity<Object> addNewsPost(@Valid @RequestBody NewsPostRequestDto newsPostRequestDto) {
        int newId = newsPostService.addPost(newsPostRequestDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newId).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping(value = "/news/{id}")
    public ResponseEntity<Object> updateNewsPost(@PathVariable int id, @RequestBody NewsPost newsPost) {
        newsPostService.updatePost(id, newsPost);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping(value = "/news/{id}")
    public ResponseEntity<Object> partialUpdateNewsPost(@PathVariable int id, @RequestBody NewsPost newsPost) {
        newsPostService.partialUpdatePost(id, newsPost);

        return ResponseEntity.noContent().build();
    }

}
