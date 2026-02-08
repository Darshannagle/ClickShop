package com.dan.app.DTO.Order;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.dan.app.config.Constant.PaymentMethod;
import com.dan.app.model.CartItem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDTO {
    // private UUID user_id;
    private UUID address_id;
    private BigDecimal totalAmount;
    private List<CartItem> cartItems;
    private PaymentMethod paymentMethod;
}
