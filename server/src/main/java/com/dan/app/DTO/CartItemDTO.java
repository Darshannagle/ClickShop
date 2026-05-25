package com.dan.app.DTO;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDTO {
    private UUID product_id;
    private Integer quantity;
    private BigDecimal soldPrice;
    private UUID user_id;
}
