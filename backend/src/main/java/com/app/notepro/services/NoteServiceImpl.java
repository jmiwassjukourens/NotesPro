package com.app.notepro.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.notepro.model.Note;
import com.app.notepro.model.Tag;
import com.app.notepro.model.User;
import com.app.notepro.repositories.NoteRepository;
import com.app.notepro.repositories.TagRepository;
import com.app.notepro.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<Note> findAll() {
        User user = getAuthenticatedUser();
        return noteRepository.findByUser(user);
    }



    @Override
    public List<Note> findByArchived(boolean archived) {
        User user = getAuthenticatedUser();
        return noteRepository.findByUserAndArchived(user, archived);
    }


    @Override
    public Note findById(Long id) {
        User user = getAuthenticatedUser();
        return noteRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new RuntimeException("Note not found or not owned by user"));
    }


    @Override
    @Transactional
    public Note save(Note note) {
        User user = getAuthenticatedUser();
        List<Tag> attachedTags = note.getTags().stream()
            .map(tag -> tagRepository.findByName(tag.getName()).orElseGet(() -> tagRepository.save(tag)))
            .collect(Collectors.toList());

        note.setTags(attachedTags);
        note.setUser(user);

        return noteRepository.save(note);
    }


    @Override
    public Note update(Long id, Note updatedNote) {
        Note existing = getNoteIfOwnedByAuthenticatedUser(id);
        existing.setTitle(updatedNote.getTitle());
        existing.setContent(updatedNote.getContent());
        existing.setArchived(updatedNote.isArchived());

        List<Tag> updatedTags = updatedNote.getTags().stream()
            .map(tag -> tagRepository.findByName(tag.getName())
                .orElseGet(() -> tagRepository.save(tag)))
            .collect(Collectors.toList());

        existing.setTags(updatedTags);
        return noteRepository.save(existing);
    }

    @Override
    public void deleteById(Long id) {
          Note note = getNoteIfOwnedByAuthenticatedUser(id);
          noteRepository.delete(note);
    }

    @Override
    public void archive(Long id) {
        Note note = getNoteIfOwnedByAuthenticatedUser(id);
        note.setArchived(true);
        noteRepository.save(note);
    }

    @Override
    public void unarchive(Long id) {
        Note note = getNoteIfOwnedByAuthenticatedUser(id);
        note.setArchived(false);
        noteRepository.save(note);
    }

    public User getAuthenticatedUser() {
        
    String username = SecurityContextHolder.getContext().getAuthentication().getName();

    return userRepository.findByUsername(username).
             orElseThrow(() -> new RuntimeException("User do not found with Username: " + username));
    }

    public List<Note> getArchivedNotesForAuthenticatedUser() {

    User user = getAuthenticatedUser();

    return noteRepository.findByUserAndArchived(user, true);
    
    }
    
    public Note getNoteIfOwnedByAuthenticatedUser(Long noteId) {

    User user = getAuthenticatedUser();

    return noteRepository.findByIdAndUser(noteId, user)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
    }


}
