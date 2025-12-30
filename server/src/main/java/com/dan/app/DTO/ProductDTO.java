package com.dan.app.DTO;

import java.math.BigDecimal;
import java.util.List;

import com.dan.app.model.Category;
import com.dan.app.model.Subcategory;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private String name;
    private String brand;
    private String description;
    private String category_id;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private String subcategory_id;
    private List<String> images;
    private Integer stock;
}
