package nl.novi.closette.service;

import nl.novi.closette.dto.NewsPostRequestDto;
import nl.novi.closette.exception.BadRequestException;
import nl.novi.closette.exception.RecordNotFoundException;
import nl.novi.closette.model.NewsPost;
import nl.novi.closette.repository.NewsPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsPostService {

    @Autowired
    private NewsPostRepository newsPostRepository;

    public Iterable<NewsPost> getNewsposts(String title) {
        if (title.isEmpty()) {
            return newsPostRepository.findAll();
        }
        else {
            return newsPostRepository.findAllByTitleContainingIgnoreCase(title);
        }
    }

    public NewsPost getPost(int id) {
        Optional<NewsPost> optionalPost = newsPostRepository.findById(id);

        if (optionalPost.isPresent()) {
            return optionalPost.get();
        }
        else {
            throw new RecordNotFoundException("ID does not exist.");
        }

    }

    public void deletePost(int id) {
        if (newsPostRepository.existsById(id)) {
            newsPostRepository.deleteById(id);
        }
        else {
            throw new RecordNotFoundException("ID does not exist!");
        }
}

    public int addPost(NewsPostRequestDto newsPostRequestDto) {

        String latitude = newsPostRequestDto.getTitle();
        List<NewsPost> posts = (List<NewsPost>) newsPostRepository.findAllByTitle(latitude);
        if (posts.size() > 0) {
            throw new BadRequestException("this exact title already exists! Please add a unique title.");
        }

        NewsPost newsPost = new NewsPost();
        newsPost.setTitle(newsPostRequestDto.getTitle());
        newsPost.setPostTime(newsPostRequestDto.getPostTime());
        newsPost.setDescription(newsPostRequestDto.getDescription());
        newsPost.setParagraph(newsPostRequestDto.getParagraph());

        NewsPost newNewspost = newsPostRepository.save(newsPost);
        return newNewspost.getId();
    }

    public void updatePost(int id, NewsPost post) {
        Optional<NewsPost> optionalPost = newsPostRepository.findById(id);

        if (optionalPost.isPresent()) {
            NewsPost storedNewsPost = optionalPost.get();

            post.setId(storedNewsPost.getId());
            newsPostRepository.save(post);
        }
        else {
            throw new RecordNotFoundException("ID does not exist.");
        }
    }

    public void partialUpdatePost(int id, NewsPost newspost) {
        Optional<NewsPost> optionalNewsPost = newsPostRepository.findById(id);

        if (optionalNewsPost.isPresent()) {
            NewsPost storedPost = newsPostRepository.findById(id).orElse(null);

            if (newspost.getTitle()!=null && !newspost.getTitle().isEmpty()) {
                storedPost.setTitle(newspost.getTitle());
            }
            if (newspost.getDescription()!=null && !newspost.getDescription().isEmpty()) {
                storedPost.setDescription(newspost.getDescription());
            }
            if (newspost.getParagraph()!=null && !newspost.getParagraph().isEmpty()) {
                storedPost.setParagraph(newspost.getParagraph());
            }
            newsPostRepository.save(storedPost);

        }
        else {
            throw new RecordNotFoundException("ID does not exist!!!");
        }
    }

}
