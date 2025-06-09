package com.app.notepro.services;

import java.util.List;

import com.app.notepro.model.Note;

public interface NoteService {
    
    List<Note> findAll();

    List<Note> findByArchived(boolean archived);

    Note findById(Long id);

    Note save(Note note);

    Note update(Long id, Note note);

    void deleteById(Long id);

    void archive(Long id);

    void unarchive(Long id);

}
