package com.dan.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dan.app.model.CartItem;
import com.dan.app.model.Product;
@Repository
public interface CartDAO extends JpaRepository<CartItem, Long> {

			@Query(nativeQuery = true,value = "call spring_db.find_Cart_by_user(:id)")
			List<CartItem> findCartByUser(Long id);

			boolean existsByProduct(Product product);
}
