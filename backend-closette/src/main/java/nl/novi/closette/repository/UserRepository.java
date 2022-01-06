package nl.novi.closette.repository;

import nl.novi.closette.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}
