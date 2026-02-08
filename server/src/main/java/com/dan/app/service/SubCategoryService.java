package com.dan.app.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dan.app.DTO.SubCategoryDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Category;
import com.dan.app.model.Subcategory;
import com.dan.app.repository.SubCategoryRepository;

@Service
public class SubCategoryService {
	private final CategoryService categoryService;
	private final SubCategoryRepository subCategoryRepository;

	public SubCategoryService(SubCategoryRepository subCategoryRepository, CategoryService categoryService) {
		super();
		this.subCategoryRepository = subCategoryRepository;
		this.categoryService = categoryService;
	}

	public ApiResponse create(SubCategoryDTO subCategoryDTO) {
		try {
			boolean isExists = subCategoryRepository.existsByName((String) subCategoryDTO.getName());
			if (isExists) {
				return new ApiResponse<>(false, null, "Subcategory is already exists");
			}

			ApiResponse category = categoryService.details("id", (UUID) subCategoryDTO.getCategoryId());
			if (!category.isStatus() || category.getData() == null) {

				return new ApiResponse(true, null, "Associated category not found");
			} else {
				Subcategory subCategory = new Subcategory((String) subCategoryDTO.getName(),
						(Category) category.getData());
				subCategory = subCategoryRepository.save(subCategory);
				return new ApiResponse<>(true, subCategory, "Category created");

			}
		} catch (Exception e) {
			return new ApiResponse<>(false, null, "Something went wrong", List.of(e.getMessage()));
		}
	}

	public ApiResponse list() {
		try {
			List<Subcategory> list = subCategoryRepository.findAll();
			return new ApiResponse(true, list, "Categories fetched");
		} catch (Exception e) {
			return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
		}
	}

	public ApiResponse findByCategory(Object categoryField, String fieldName) {
		try {
			List<Subcategory> list;
			if (fieldName.equals("id")) {
				list = subCategoryRepository.findByCategoryId(UUID.fromString(categoryField.toString()));
			} else {
				list = subCategoryRepository.findByCategoryName((String) categoryField);
			}

			return new ApiResponse(true, list, "Categories fetched");
		} catch (Exception e) {
			return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
		}
	}

	public ApiResponse details(String field, Object value) {
		try {
			Subcategory subcategory;
			if (field == "id") {
				subcategory = subCategoryRepository.findById((UUID) value)
						.orElseThrow(() -> new Exception("Subcategory not found"));
			} else {
				subcategory = subCategoryRepository.findByName((String) value);
			}

			if (subcategory == null) {
				return new ApiResponse<>(false, null, "Subcategory not found");
			} else {

				return new ApiResponse(true, subcategory, "Subcategory fetched");
			}

		} catch (Exception e) {
			return new ApiResponse(false, null, (e.getMessage() == null) ? "Something went wrong" : e.getMessage(),
					List.of(e.getMessage()));
		}
	}
}
