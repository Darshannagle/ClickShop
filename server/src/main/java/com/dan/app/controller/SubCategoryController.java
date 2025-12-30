package com.dan.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.SubCategoryDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.service.SubCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/subcategory")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        super();
        this.subCategoryService = subCategoryService;
    }

    @PostMapping("/create")
    public ResponseEntity create(@Valid @RequestBody SubCategoryDTO subCategoryDTO) {
        try {

            ApiResponse response = subCategoryService.create(MapperConfig.toJson(subCategoryDTO));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        try {
            ApiResponse response = subCategoryService.list();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list-by-category")
    public ResponseEntity list(@RequestParam String field, @RequestParam String category) {
        try {
            System.out.println("field:" + field);
            System.out.println("category:" + category);

            ApiResponse response = subCategoryService.findByCategory(category, field);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

}