package com.dan.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

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

	public ApiResponse create(Map<String, Object> body) {
		try {
			boolean isExists = subCategoryRepository.existsByName((String) body.get("name"));
			if (isExists) {
				return new ApiResponse<>(false, null, "Subcategory is already exists");
			}

			ApiResponse category = categoryService.details("id", (String) body.get("categoryId"));
			System.out.println("category:" + MapperConfig.toJson(category));
			if (!category.isStatus() || category.getData() == null) {

				return new ApiResponse(true, null, "Associated category not found");
			} else {
				Subcategory subCategory = new Subcategory((String) body.get("name"), (Category) category.getData());
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

	public ApiResponse findByCategory(String categoryField, String fieldName) {
		try {
			List<Subcategory> list;
			System.out.println("fieldName:" + fieldName);
			System.out.println("fieldName == id" + fieldName.equals("id"));
			System.out.println("categoryField" + categoryField);
			if (fieldName.equals("id")) {
				list = subCategoryRepository.findByCategoryId(categoryField);
			} else {
				list = subCategoryRepository.findByCategoryName(categoryField);
			}

			return new ApiResponse(true, list, "Categories fetched");
		} catch (Exception e) {
			return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
		}
	}

	public ApiResponse details(String field, String value) {
		try {
			Subcategory subcategory;
			if (field == "id") {
				subcategory = subCategoryRepository.findById(value)
						.orElseThrow(() -> new Exception("Subcategory not found"));
			} else {
				subcategory = subCategoryRepository.findByName(value);
			}
			System.out.println("subcategory:" + MapperConfig.toJson(subcategory));

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
