package com.app.notepro.boostrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.app.notepro.model.Tag;
import com.app.notepro.repositories.TagRepository;

import java.util.HashMap;
import java.util.Map;

@Component
@Order(2)
public class TagInitializer implements CommandLineRunner {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public void run(String... args) {
        Map<String, String> predefinedTags = new HashMap<>();
        predefinedTags.put("work", "#3B82F6");
        predefinedTags.put("personal", "#8B5CF6");
        predefinedTags.put("shopping", "#10B981");
        predefinedTags.put("urgent", "#EF4444");
        predefinedTags.put("home", "#F59E0B");
        predefinedTags.put("health", "#06B6D4");
        predefinedTags.put("finance", "#64748B");
        predefinedTags.put("travel", "#6366F1");
        predefinedTags.put("study", "#EC4899");
        predefinedTags.put("idea", "#F472B6");
        predefinedTags.put("reminder", "#F87171");
        predefinedTags.put("cooking", "#FBBF24");
        predefinedTags.put("fitness", "#22C55E");
        predefinedTags.put("event", "#A855F7");
        predefinedTags.put("important", "#DC2626");

        for (Map.Entry<String, String> entry : predefinedTags.entrySet()) {
            createTagIfNotExists(entry.getKey(), entry.getValue());
        }
    }

    private void createTagIfNotExists(String name, String color) {
        if (!tagRepository.findByName(name).isPresent()) {
            Tag tag = new Tag();
            tag.setName(name);
            tag.setColor(color);
            tagRepository.save(tag);
     
            
        }
    }
}