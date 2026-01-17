package com.dan.app.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.dan.app.model.Order;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUser_id(UUID user_id);

    void deleteAllByUser_id(UUID userId);
}
