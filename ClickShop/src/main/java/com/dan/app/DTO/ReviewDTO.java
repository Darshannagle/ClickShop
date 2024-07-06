package com.dan.app.DTO;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@RequiredArgsConstructor
@ToString
public class ReviewDTO {

	private float rate;
	
	private String username;
	
	private String comment;

	private Long product_id;

	public ReviewDTO(float rate, String username, String comment, Long product_id) {
		super();
		this.rate = rate;
		this.username = username;
		this.comment = comment;
		this.product_id = product_id;
	}
	
	
}
