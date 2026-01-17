package com.dan.app.service;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dan.app.DTO.UserDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.Constant.Gender;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Role;
import com.dan.app.model.User;
import com.dan.app.repository.RoleRepository;
import com.dan.app.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ApiResponse signup(UserDTO request) {
        try {

            logger.info(MapperConfig.toJson(request).toString());
            if (userRepository.existsByEmail(request.getEmail())) {
                // throw new RuntimeException("Email already registered");
                return new ApiResponse(false, null, "Email already registered");
            }

            logger.info("no duplicate", request.getEmail());
            Role userRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));
            logger.info("userrole found:" + userRole);
            String encodedPassword = (passwordEncoder.encode(request.getPassword()));
            logger.info("encodedPassword:" + encodedPassword);
            User user = new User(request.getFullName(), request.getEmail(), encodedPassword, request.getPhone(),
                    Gender.valueOf(request.getGender()), request.getLocation(), request.getPinCode(), Set.of(userRole));
            logger.info("user: " + user.toString());

            user = userRepository.save(user);
            System.out.println("user :" + MapperConfig.toJson(user));
            return new ApiResponse(true, user, "User registered successfully");

        } catch (Exception e) {
            e.printStackTrace(); // ← Add this
            logger.error("Signup failed", e); // Full stack trace in logs
            System.out.println("Full error: " + e.getClass().getName());
            System.out.println("Message: " + e.getMessage());

            // Print ROOT CAUSE (the real DB error)
            Throwable rootCause = e.getCause();
            while (rootCause != null && rootCause.getCause() != null) {
                rootCause = rootCause.getCause();
            }
            if (rootCause != null) {
                System.out.println("ROOT CAUSE: " + rootCause.getClass().getName() + " - " + rootCause.getMessage());
            }

            return new ApiResponse(false, null, "Something went wrong", List.of(e.getLocalizedMessage()));
        }
    }
}
