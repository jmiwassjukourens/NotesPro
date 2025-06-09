package com.app.notepro.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.app.notepro.model.User;

public interface UserRepository extends CrudRepository<User, Long>{

    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
    
}
