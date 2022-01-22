package nl.novi.closette.repository;

import nl.novi.closette.model.Toilet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ToiletRepository extends JpaRepository<Toilet, Integer> {

    List<Toilet> findAllByTitle(String title);

    List<Toilet> findAllByTitleContainingIgnoreCase(String title);

    List<Toilet> findAllByLatitude(String latitude);

    List<Toilet> findAllByCity(String city);

    List<Toilet> findAllByCityContainingIgnoreCase(String city);

    List<Toilet> findAllByCountry(String country);

    List<Toilet> findAllByCountryContainingIgnoreCase(String country);

    List<Toilet> findAllByGenderneutral(Boolean genderneutral);

    List<Toilet> findAllByFree(Boolean free);

    List<Toilet> findAllByAccessible(Boolean accessible);

    //    List<Toilet> findAllByCleanliness(Boolean cleanliness);
    List<Toilet> findAllByHasPhoto(Boolean hasPhoto);

    //    @Query("SELECT b FROM Toilet b WHERE b.title LIKE %:s%")    // using JPQL
//    or
    @Query(value = "SELECT * FROM toilets b WHERE b.title LIKE %:s%", nativeQuery = true)
    // using SQL
    Iterable<Toilet> searchByTitleLike(@Param("s") String s);

//    @Query(value = "SELECT * FROM toilets b WHERE b.city LIKE %:s%", nativeQuery = true)
//    Iterable<Toilet> searchByCityLike(@Param("s") String s);

    @Query(value = "SELECT * FROM toilets b WHERE b.country LIKE %:s%", nativeQuery = true)
    Iterable<Toilet> searchByCountryLike(@Param("s") String s);

    @Query(value = "SELECT * FROM toilets WHERE title=?1 AND city=?2 AND country=?3 ORDER BY city", nativeQuery = true)
    Iterable<Toilet> findAllByTitleAndCityAndCountry(String title, String city, String country);


}
