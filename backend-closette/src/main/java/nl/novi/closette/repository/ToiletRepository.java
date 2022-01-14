package nl.novi.closette.repository;

import nl.novi.closette.model.Toilet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ToiletRepository extends JpaRepository<Toilet, Integer> {

    List<Toilet> findAllByTitle(String title);
    List<Toilet> findAllByTitleContainingIgnoreCase(String title);
    List<Toilet> findAllByLatitude(String latitude);
    List<Toilet> findAllByCity(String city);
    List<Toilet> findAllByCityContainingIgnoreCase(String city);
    Iterable<Toilet> findAllByCountry(String country);
    Iterable<Toilet> findAllByCountryContainingIgnoreCase(String country);

//    @Query("SELECT b FROM Toilet b WHERE b.title LIKE %:s%")    // using JPQL
//    or
    @Query(value = "SELECT * FROM toilets b WHERE b.title LIKE %:s%", nativeQuery = true) // using SQL
    Iterable<Toilet> searchByTitleLike(@Param("s") String s);

    @Query(value = "SELECT * FROM toilets b WHERE b.city LIKE %:s%", nativeQuery = true)
    Iterable<Toilet> searchByCityLike(@Param("s") String s);

    @Query(value = "SELECT * FROM toilets b WHERE b.country LIKE %:s%", nativeQuery = true)
    Iterable<Toilet> searchByCountryLike(@Param("s") String s);

}
