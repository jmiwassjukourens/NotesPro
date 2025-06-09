package com.app.notepro.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.app.notepro.model.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);
    
}
