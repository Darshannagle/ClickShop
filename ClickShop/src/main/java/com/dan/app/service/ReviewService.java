package com.dan.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dan.app.DAO.ProductDAO;
import com.dan.app.DAO.ReviewDAO;
import com.dan.app.DTO.ReviewDTO;
import com.dan.app.model.Product;
import com.dan.app.model.Review;


@Service
public class ReviewService {

	@Autowired
	private ReviewDAO reviewDAO;
	
	@Autowired
	private ProductDAO productDAO;
	
	public List<Review> getReviews(Long product_id) {
		List<Review> reviews = reviewDAO.getReviews(product_id);
		return reviews;
	}

	public Review addReview(ReviewDTO reviewDTO) {
		Review review = new Review();
		System.out.println(reviewDTO.getProduct_id());
		Optional<Product> pOptional = productDAO.findById(reviewDTO.getProduct_id());
		if (pOptional.isPresent()) {
			Product product = pOptional.get();
			int count = product.getRate_count();
			float rate =0;
			List<Review> reviews = getReviews(reviewDTO.getProduct_id());
			
			for (Review r : reviews) {
				rate+= r.getRate();
			}
			rate+=reviewDTO.getRate();
			rate/=(count+1);
			System.out.println("rate/count "+rate);
			rate = (float) (Math.round(rate*Math.pow(10,2))/Math.pow(10,2));
			
			System.out.println("final rate of product"+ rate);
			product.setRate(rate);
			product.setRate_count(count+1);
			System.out.println("final count : "+product.getRate_count());
			productDAO.save(product);
			review.setRate(reviewDTO.getRate());
			review.setComment(reviewDTO.getComment());
			review.setProduct(product);
			review.setUsername(reviewDTO.getUsername());
		review =  reviewDAO.save(review);
			
			return review;
			
		} else {
return null;
		}
		}

	
	
	

}