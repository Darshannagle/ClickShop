package com.dan.app.model;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // @ManyToOne(fetch = FetchType.LAZY)
    // private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    // min : 1
    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, updatable = false)
    private BigDecimal soldPrice;

    @Column(columnDefinition = "json")
    private JsonNode productSnapshot;

    public OrderItem() {
        super();
    }

}
