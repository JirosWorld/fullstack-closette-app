package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.NewsPost;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface NewsPostRepository extends CrudRepository<NewsPost, Integer> {

    Iterable<NewsPost> findAllByTitle(String title);
    Iterable<NewsPost> findAllByTitleContainingIgnoreCase(String title);

    @Query(value = "SELECT * FROM newsposts b WHERE b.title LIKE %:s%", nativeQuery = true)
    Iterable<NewsPost> searchByTitleLike(@Param("s") String s);

}
