package com.dan.app.repository;

import org.springframework.stereotype.Repository;

import com.dan.app.model.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(String name);
}
