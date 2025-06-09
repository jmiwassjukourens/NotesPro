package com.app.notepro.controllers;


import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.notepro.model.Note;
import com.app.notepro.services.NoteService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<Note> getAll() {
        return noteService.findAll();
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/archived")
    public List<Note> getArchived() {
        return noteService.findByArchived(true);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/active")
    public List<Note> getActive() {
        return noteService.findByArchived(false);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(noteService.findById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Note note) {
        System.out.println("NOTE BODY => " + note);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.save(note));
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Note note) {
        return ResponseEntity.ok(noteService.update(id, note));
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        noteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}/archive")
    public ResponseEntity<Void> archive(@PathVariable Long id) {
        noteService.archive(id); 
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}/unarchive")
    public ResponseEntity<Void> unarchive(@PathVariable Long id) {
        noteService.unarchive(id); 
        return ResponseEntity.noContent().build();
    }

}
