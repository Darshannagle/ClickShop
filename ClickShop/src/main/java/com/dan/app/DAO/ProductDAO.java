package com.dan.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dan.app.model.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long>{

	List<Product> findByCategory(String category);

}
