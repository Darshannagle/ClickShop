package com.dan.app.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.dan.app.model.Category;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    boolean existsByName(String name);

    Category findByName(String name);

    @NonNull
    Optional<Category> findById(UUID id);

}
