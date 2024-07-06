package com.dan.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dan.app.model.Review;

public interface ReviewDAO extends JpaRepository<Review, Long>{

	@Query(value = "select * from review where product_id= :pid",nativeQuery = true)
	List<Review> getReviews(@Param("pid") Long pid);
	
}
