package nl.novi.closette.repository;

import nl.novi.closette.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    Photo findByFileName(String fileName);
    Optional<Photo> findPhotoById(Long id);
}