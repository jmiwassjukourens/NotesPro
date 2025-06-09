package com.app.notepro.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.app.notepro.model.Tag;

public interface TagRepository extends CrudRepository<Tag, Long>{
    Optional<Tag> findByName(String name);
}
