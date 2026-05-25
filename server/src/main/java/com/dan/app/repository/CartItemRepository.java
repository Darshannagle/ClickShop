package com.dan.app.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dan.app.model.CartItem;
import com.dan.app.model.User;

import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    List<CartItem> findByUser_id(UUID user_id);

    CartItem findByUser_idAndProduct_id(UUID user_id, UUID product_id);

    void deleteAllByUser(User user);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId")
    void deleteAllByUser_id(@Param("userId") UUID userId);
    // void deleteAllByUser_id(UUID userId);
}
