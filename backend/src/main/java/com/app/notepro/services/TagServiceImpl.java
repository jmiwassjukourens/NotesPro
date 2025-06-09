package com.app.notepro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.notepro.model.Tag;
import com.app.notepro.repositories.TagRepository;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> findAll() {
        return (List<Tag>) tagRepository.findAll();
    }

    @Override
    public Tag findById(Long id) {
        return tagRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found with ID: " + id));
    }

    @Override
    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public void deleteById(Long id) {
        tagRepository.deleteById(id);
    }


}