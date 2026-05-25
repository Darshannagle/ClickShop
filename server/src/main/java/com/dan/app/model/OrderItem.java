package com.dan.app.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;

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

@Entity
@Table(name = "order_items")
@Data
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class OrderItem {

	public OrderItem(Order order, Product product, Integer quantity, BigDecimal soldPrice, JsonNode productSnapshot) {
		super();
		// this.order = order;
		this.product = product;
		this.quantity = quantity;
		this.soldPrice = soldPrice;
		this.productSnapshot = productSnapshot;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	@JsonBackReference
	// @JsonIdentityReference(alwaysAsId = true)
	private Order order;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "product_id")
	private Product product;
	// min : 1
	@Column(nullable = false)
	private Integer quantity;

	@Column(nullable = false, updatable = false)
	private BigDecimal soldPrice;

	@Column(columnDefinition = "json")
	private JsonNode productSnapshot;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@CreatedBy
	private UUID createdBy;

	@LastModifiedBy
	private UUID updatedBy;

	public OrderItem() {
		super();
	}

}
