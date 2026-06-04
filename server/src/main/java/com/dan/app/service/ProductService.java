package com.dan.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import com.dan.app.DTO.ProductDTO;
import com.dan.app.DTO.ProductListDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Category;
import com.dan.app.model.Product;
import com.dan.app.model.Subcategory;
import com.dan.app.repository.ProductRepository;
import com.dan.app.utils.Common;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SubCategoryService subCategoryService;

    // public Product dTOMapper(ProductDTO productDTO) {
    // Product product = new Product();
    // product.setName(productDTO.getName());
    // product.setBrand(productDTO.getBrand());
    // product.setCategory(productDTO.getCategory());
    // product.setSubCategory(productDTO.getSubCategory());
    // product.setImages(productDTO.getImages());
    // return product;
    // }

    public ApiResponse list(int page, int size, String sortField, String direction) {
        try {
            Page<ProductListDTO> products;

            Direction sortDirection = direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            Order order = new Order(sortDirection, sortField);

            Pageable pageable = PageRequest.of(page, size, Sort.by(order));
            products = productRepository.findAll(pageable).map(ProductListDTO::new);
            Map<String, Object> data = new HashMap<>();
            data.put("content", products.getContent());
            data.put("pagination", Common.buildPagination(products));
            return new ApiResponse(true, data, "Products fetched");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse findByName(String keyword, int page, int size, String[] sort) {
        try {
            Page<Product> products;
            String sortField = (sort[0] == null) ? sort[0] : "";
            String sortDirection = sort[1];

            Direction direction = sortDirection.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            @SuppressWarnings("null")
            Order order = new Order(direction, sortField);

            Pageable pageable = PageRequest.of(page - 1, size, Sort.by(order));
            products = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
            return new ApiResponse(true, products, "Products fetched");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse create(ProductDTO productDTO) {
        try {
            Category category = (Category) categoryService.details("id", productDTO.getCategory_id()).getData();
            if (category == null) {
                return new ApiResponse<>(false, null, "Category not found");
            }

            Subcategory subcategory = (Subcategory) subCategoryService.details("id", productDTO.getSubcategory_id())
                    .getData();
            if (subcategory == null) {
                return new ApiResponse<>(false, null, "Subcategory not found");
            }
            // convert the speification to json
            JsonNode specsNode = MapperConfig.mapper.readTree(
                    MapperConfig.getParser(productDTO.getSpecifications()));
            Product p = new Product(productDTO.getName(), productDTO.getBrand(), productDTO.getDescription(),
                    productDTO.getBasePrice(), productDTO.getSalePrice(), productDTO.getStock(), category, subcategory,
                    productDTO.getImages(), specsNode);
            p.setSpecifications(specsNode);
            p = productRepository.save(p);
            return new ApiResponse(true, p, "Product created");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse details(UUID id) {
        try {
            if (id == null) {
                // throw error
                return new ApiResponse(false, null, "Product not found", List.of("Product not found"));
            }
            Product product = productRepository.findById(id).orElse(null);
            return new ApiResponse(true, product, "Product fetched");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse createAll(ProductDTO[] productDTOs) {
        try {
            for (ProductDTO productDTO : productDTOs) {
                Category category = (Category) categoryService.details("id", productDTO.getCategory_id()).getData();
                if (category == null) {
                    return new ApiResponse<>(false, null, "Category not found");
                }

                Subcategory subcategory = (Subcategory) subCategoryService.details("id", productDTO.getSubcategory_id())
                        .getData();
                if (subcategory == null) {
                    return new ApiResponse<>(false, null, "Subcategory not found");
                }
                // convert the speification to json
                JsonNode specsNode = MapperConfig.mapper.readTree(
                        MapperConfig.getParser(productDTO.getSpecifications()));
                Product p = new Product(productDTO.getName(), productDTO.getBrand(), productDTO.getDescription(),
                        productDTO.getBasePrice(), productDTO.getSalePrice(), productDTO.getStock(), category,
                        subcategory,
                        productDTO.getImages(), specsNode);
                p.setSpecifications(specsNode);
                p = productRepository.save(p);
                return new ApiResponse(true, p, "Product created");
            }
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
        return null;
    }

}