package com.app.notepro.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.app.notepro.model.Note;
import com.app.notepro.model.User;

public interface NoteRepository extends CrudRepository<Note, Long> {
    
    List<Note> findByArchived(boolean archived);

        List<Note> findByUserAndArchived(User user, boolean archived);

        List<Note> findByUser(User user);
        
        Optional<Note> findByIdAndUser(Long id, User user);



}

