package com.dan.app.DTO.OrderItem;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.dan.app.model.OrderItem;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemListDTO {
    private UUID id;
    private UUID product_id;
    private Integer quantity;
    private BigDecimal soldPrice;
    private JsonNode productSnapshot;

    public static List<OrderItemListDTO> toList(List<OrderItem> orderItems) {
        List<OrderItemListDTO> list = new ArrayList<>();
        return orderItems.stream().map((OrderItem orderItem) -> {
            return new OrderItemListDTO(orderItem.getId(), orderItem.getProduct().getId(), orderItem.getQuantity(),
                    orderItem.getSoldPrice(), orderItem.getProductSnapshot());
        }).toList();
    }

}
