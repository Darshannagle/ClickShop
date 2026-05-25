package com.dan.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.hibernate.boot.model.source.spi.SubclassEntitySource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.dan.app.model.Category;
import com.dan.app.model.Subcategory;

@Repository
public interface SubCategoryRepository extends JpaRepository<Subcategory, UUID> {
    boolean existsByName(String name);

    List<Subcategory> findByCategoryId(UUID categoryId);

    List<Subcategory> findByCategoryName(String categoryName);

    Subcategory findByName(String name);

    @NonNull
    Optional<Subcategory> findById(UUID id);

}
