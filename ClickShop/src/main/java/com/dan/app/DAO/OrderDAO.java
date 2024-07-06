package com.dan.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dan.app.model.Orders;

public interface OrderDAO extends JpaRepository<Orders, Long> {

@Query(nativeQuery = true, value = "call spring_db.get_orders_from_userID(:userid)")
List<Orders> findByUser(Long userid);

	
	
}
