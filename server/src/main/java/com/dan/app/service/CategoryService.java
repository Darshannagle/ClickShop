package com.dan.app.service;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import com.dan.app.DTO.CategoryDTO;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Category;
import com.dan.app.model.Subcategory;
import com.dan.app.repository.CategoryRepository;

import jakarta.validation.Valid;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }

    public ApiResponse list() {
        try {
            List<Category> list = categoryRepository.findAll();
            return new ApiResponse(true, list, "Categories fetched");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse create(CategoryDTO categoryDTO) {
        try {
            boolean isExists = categoryRepository.existsByName(categoryDTO.getName());
            if (isExists) {
                return new ApiResponse<>(false, null, "category is already exists");
            }
            Category category = new Category(categoryDTO.getName());
            category = categoryRepository.save(category);
            return new ApiResponse<>(true, category, "Category created");
        } catch (Exception e) {
            return new ApiResponse<>(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse details(String field, String value) {
        try {
            Category category;
            if (field == "id") {
                category = categoryRepository.findById(value)
                        .orElseThrow(() -> new Exception("Category not found"));
            } else {
                category = categoryRepository.findByName(value);
            }

            return new ApiResponse(true, category, "Category fetched");
        } catch (Exception e) {
            return new ApiResponse(false, null, (e.getMessage() == null) ? "Something went wrong" : e.getMessage(),
                    List.of(e.getMessage()));
        }
    }

}
