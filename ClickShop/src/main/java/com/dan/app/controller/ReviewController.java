package com.dan.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.ReviewDTO;
import com.dan.app.model.Review;
import com.dan.app.service.ReviewService;

import lombok.RequiredArgsConstructor;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	
	@GetMapping("/Review/{pid}")
	public List<Review> getReviews(@PathVariable("pid") Long pid) {

		List<Review> reviews = reviewService.getReviews(pid);
		return reviews;
	}
	
	@PostMapping("/Review")
	public Review addReview(@RequestBody ReviewDTO reviewDTO)
	{
		System.out.println(reviewDTO);
		Review review = reviewService.addReview(reviewDTO);
		return review;
	}
	
	
	
}
