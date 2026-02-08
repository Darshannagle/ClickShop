package com.dan.app.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dan.app.model.OrderItem;
import java.util.List;


@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
	List<OrderItem> findByOrder_id(UUID orderid);
}
