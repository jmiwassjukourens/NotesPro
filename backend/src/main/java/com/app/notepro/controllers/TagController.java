package com.app.notepro.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.notepro.model.Tag;
import com.app.notepro.services.TagService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<Tag> getAll() {
        return tagService.findAll();
    }

}
