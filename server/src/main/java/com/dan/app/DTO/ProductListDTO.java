package com.dan.app.DTO;

import java.math.BigDecimal;

import com.dan.app.model.Category;
import com.dan.app.model.Product;
import com.dan.app.model.Subcategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductListDTO {
    private String id;
    private String name;
    private String brand;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private Category category;
    private Subcategory subCategory;
    private String[] images;
    private String description;
    private Integer stock;

    public ProductListDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.brand = product.getBrand();
        this.basePrice = product.getBasePrice();
        this.salePrice = product.getSalePrice();
        this.images = product.getImages().stream().toArray(String[]::new);
        this.description = product.getDescription();
        this.stock = product.getStock();

        // Only map id + name for category/subcategory
        if (product.getCategory() != null) {
            this.category = new Category(
                    product.getCategory().getId(),
                    product.getCategory().getName());
        }
        if (product.getSubCategory() != null) {
            this.subCategory = new Subcategory(
                    product.getSubCategory().getId(),
                    product.getSubCategory().getName());
        }
    }

}
