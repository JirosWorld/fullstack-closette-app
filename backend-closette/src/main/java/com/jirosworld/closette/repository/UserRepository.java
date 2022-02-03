package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

//public interface UserRepository extends CrudRepository<User, String> {
//}

public interface UserRepository extends JpaRepository<User, String> {
}
