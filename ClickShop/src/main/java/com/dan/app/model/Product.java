package com.dan.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;
@Entity
@Data
@RequiredArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long product_id;
	private String title;
	private Long price;
	private String category;
	private String description;
	private String image;
	private float rate;
	private int rate_count;
	private int stock;
	
	
	
	

}
