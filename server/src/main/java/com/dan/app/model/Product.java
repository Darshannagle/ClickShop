package com.dan.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.databind.JsonNode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", nullable = false)
	private UUID id;

	@Column(nullable = false, unique = true)
	private String name;

	@Column(nullable = true)
	private String brand;

	@Column(nullable = true, columnDefinition = "LONGTEXT")
	private String description;

	@Column(nullable = false, precision = 15, scale = 2)
	private BigDecimal basePrice;

	@Column(nullable = false, precision = 15, scale = 2)
	private BigDecimal salePrice;

	@Column(nullable = false)
	private Integer stock;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "subcategory_id")
	private Category category;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id")
	private Subcategory subCategory;

	@JdbcTypeCode(SqlTypes.ARRAY)
	@Column(columnDefinition = "LONGBLOB")
	private List<String> images = new ArrayList<>();

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(columnDefinition = "json")
	private JsonNode specifications;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@CreatedBy
	private UUID createdBy;

	@LastModifiedBy
	private UUID updatedBy;

	public Product() {
		super();
	}

	// public Product(String name, String brand, String description, BigDecimal
	// basePrice, BigDecimal salePrice,
	// Integer stock,
	// Category category, Subcategory subCategory, List<String> images) {
	// super();
	// this.name = name;
	// this.brand = brand;
	// this.description = description;
	// this.basePrice = basePrice;
	// this.salePrice = salePrice;
	// this.stock = stock;
	// this.category = category;
	// this.subCategory = subCategory;
	// this.images = images;
	// }

	public Product(String name, String brand, String description, BigDecimal basePrice, BigDecimal salePrice,
			Integer stock,
			Category category, Subcategory subCategory, List<String> images, JsonNode specifications) {
		super();
		this.name = name;
		this.brand = brand;
		this.description = description;
		this.basePrice = basePrice;
		this.salePrice = salePrice;
		this.stock = stock;
		this.category = category;
		this.subCategory = subCategory;
		this.images = images;
		this.specifications = specifications;
	}

	public Product(String name, String brand, String description, BigDecimal basePrice, BigDecimal salePrice,
			Category category, Subcategory subCategory, List<String> images, LocalDateTime createdAt,
			LocalDateTime updatedAt, UUID createdBy, UUID updatedBy) {
		super();
		this.name = name;
		this.brand = brand;
		this.description = description;
		this.basePrice = basePrice;
		this.salePrice = salePrice;
		this.category = category;
		this.subCategory = subCategory;
		this.images = images;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
	}

}
