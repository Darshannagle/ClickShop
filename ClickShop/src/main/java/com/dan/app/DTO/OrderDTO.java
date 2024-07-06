package com.dan.app.DTO;

import lombok.Data;

@Data
public class OrderDTO {
 private Long product_id;
 private  Long user_id;
	private int quantity;
	private Long total;
	
}
