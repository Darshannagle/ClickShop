package com.dan.app.DTO.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.dan.app.DTO.OrderItem.OrderItemListDTO;
import com.dan.app.config.Constant.OrderStatus;
import com.dan.app.model.Order;
import com.dan.app.model.OrderItem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderListDTO {
    private UUID id;
    private UUID user_id;
    private List<OrderItemListDTO> orderItems;
    private BigDecimal totalAmount;
    private OrderStatus orderStatus;
    private LocalDateTime createdAt;

    public static List<OrderListDTO> toList(List<Order> orders) {
        return orders.stream()
                .map(order -> new OrderListDTO(order.getId(), order.getUser().getId(),
                        OrderItemListDTO.toList(order.getOrderItems()),
                        order.getTotalAmount(), order.getOrderStatus(), order.getCreatedAt()))
                .toList();
    }
}
