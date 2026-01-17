package com.dan.app.DTO.Order;

import java.util.List;

import com.dan.app.model.CartItem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDTO {
    // private UUID user_id;
    private List<CartItem> cartItems;
}
