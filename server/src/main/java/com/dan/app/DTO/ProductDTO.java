package com.dan.app.DTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private String name;
    private String brand;
    private String description;
    private UUID category_id;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private UUID subcategory_id;
    private List<String> images;
    private Integer stock;
    private JsonNode specifications;
}
