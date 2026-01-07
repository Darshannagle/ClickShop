package com.dan.app.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dan.app.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    List<CartItem> findByUser_id(UUID user_id);

    CartItem findByUser_idAndProduct_id(UUID user_id, UUID product_id);
}
