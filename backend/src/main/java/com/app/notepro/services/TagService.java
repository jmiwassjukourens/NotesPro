package com.app.notepro.services;

import java.util.List;

import com.app.notepro.model.Tag;

public interface TagService {
    List<Tag> findAll();
    Tag findById(Long id);
    Tag save(Tag tag);
    void deleteById(Long id);
}
