package com.jirosworld.closette.repository;

import com.jirosworld.closette.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
