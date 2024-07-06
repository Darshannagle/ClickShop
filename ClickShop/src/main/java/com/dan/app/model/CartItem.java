package com.dan.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
@Entity
@Data

public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long item_id;
	@ManyToOne
	@JoinColumn(name = "product_id",referencedColumnName ="product_id" )
	private Product product;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id",referencedColumnName = "user_id")
	private User user;
//	private Long user_id;
	
	
	private int quantity;

	
	public CartItem(Product product, User user, int quantity) {
		super();
		this.product = product;
		this.user = user;
		this.quantity = quantity;
	}

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}

