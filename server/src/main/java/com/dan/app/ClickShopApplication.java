package com.dan.app;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dan.app.model.Role;
import com.dan.app.repository.RoleRepository;

@SpringBootApplication
public class ClickShopApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(ClickShopApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Check if roles already exist to avoid duplicates
		if (roleRepository.count() == 0) {
			roleRepository.saveAll(
					Arrays.asList(
							new Role("SUPER-ADMIN"),
							new Role("ADMIN"),
							new Role("USER")));
			System.out.println("Roles seeded successfully.");
		} else {
			System.out.println("Roles already exist, skipping seeding.");
		}
	}
}
