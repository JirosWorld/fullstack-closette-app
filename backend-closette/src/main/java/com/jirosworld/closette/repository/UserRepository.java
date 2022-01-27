package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}
