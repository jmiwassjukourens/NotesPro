package com.app.notepro.boostrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.app.notepro.model.Role;
import com.app.notepro.repositories.RoleRepository;

@Component
@Order(1)
public class RoleInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        createRoleIfNotExists("ROLE_USER");
    }

    private void createRoleIfNotExists(String roleName) {
        if (!roleRepository.findByName(roleName).isPresent()) {
            Role role = new Role(roleName);
            roleRepository.save(role);
            System.out.println("Role created: " + roleName);
        }
    }
}
