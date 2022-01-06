package nl.novi.closette.repository;

import nl.novi.closette.model.Toilet;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ToiletRepository extends CrudRepository<Toilet, Integer> {

    Iterable<Toilet> findAllByTitle(String title);
    Iterable<Toilet> findAllByTitleContainingIgnoreCase(String title);
    Iterable<Toilet> findAllByLatitude(String latitude);

//    @Query("SELECT b FROM Toilet b WHERE b.title LIKE %:s%")    // using JPQL
//    or
    @Query(value = "SELECT * FROM toilets b WHERE b.title LIKE %:s%", nativeQuery = true) // using SQL
    Iterable<Toilet> searchByTitleLike(@Param("s") String s);

}
