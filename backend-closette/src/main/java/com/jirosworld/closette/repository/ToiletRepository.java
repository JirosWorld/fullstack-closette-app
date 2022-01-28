package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.Toilet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ToiletRepository extends JpaRepository<Toilet, Integer> {

    List<Toilet> findAllByTitleContainingIgnoreCase(String title);

    List<Toilet> findAllByCityContainingIgnoreCase(String city);

    List<Toilet> findAllByCountryContainingIgnoreCase(String country);

    List<Toilet> findAllByGenderneutral(Boolean genderneutral);

    List<Toilet> findAllByTitle(String title);

    List<Toilet> findAllByLatitude(String latitudeDuplicate);

    List<Toilet> findAllByFree(Boolean free);

    List<Toilet> findAllByHasPhoto(Boolean hasPhoto);

    @Query(value = "SELECT * FROM toilets b WHERE b.title LIKE %:s%", nativeQuery = true)
    // using SQL
    Iterable<Toilet> searchByTitleLike(@Param("s") String s);

    @Query(value = "SELECT * FROM toilets b WHERE b.country LIKE %:s%", nativeQuery = true)
    Iterable<Toilet> searchByCountryLike(@Param("s") String s);

//    List<Toilet> findAllToiletsQuery(String title, String city, String country);

    @Query(value = "SELECT * FROM toilets WHERE title=?1 AND city=?2 AND country=?3 ORDER BY city", nativeQuery = true)
    Iterable<Toilet> findAllByTitleAndCityAndCountry(String title, String city, String country);

}
