package com.dan.app.controller;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.ProductDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Product;
import com.dan.app.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // create method
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody ProductDTO productDTO) {
        try {
            System.out.println("productDTO:" + productDTO);
            ApiResponse response = productService.create(productDTO);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/find-by-name")
    public ResponseEntity findProductsByName(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,asc") String sort) {
        try {
            System.out.println("keyword:" + keyword + " page:" + page + " size:" + size + " sort:" + sort);
            ApiResponse response = productService.findByName(keyword, page, size, sort.split(","));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list")
    public ResponseEntity findProducts(
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int size,
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDirection) {
        try {
            ApiResponse response = productService.list(page, size, sortBy, sortDirection);
            return new ResponseEntity(response, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("e:" + e);
            return new ResponseEntity(
                    new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage())),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
