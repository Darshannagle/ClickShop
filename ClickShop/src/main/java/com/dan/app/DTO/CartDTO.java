
package com.dan.app.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartDTO {

	private Long product_id;
	private Long user_id;
	private int quantity;
}


