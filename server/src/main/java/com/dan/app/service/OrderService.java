package com.dan.app.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dan.app.DTO.Order.OrderDTO;
import com.dan.app.DTO.Order.OrderListDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.CartItem;
import com.dan.app.model.Order;
import com.dan.app.model.OrderItem;
import com.dan.app.model.User;
import com.dan.app.repository.CartItemRepository;
import com.dan.app.repository.OrderItemRepository;
import com.dan.app.repository.OrderRepository;
import com.dan.app.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
            UserRepository userRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public ApiResponse create(UUID userId, OrderDTO orderDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setCreatedBy(userId);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : orderDTO.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSoldPrice(cartItem.getSoldPrice());
            orderItem.setCreatedBy(userId);

            JsonNode productNode = MapperConfig.mapper.valueToTree(cartItem.getProduct());
            orderItem.setProductSnapshot(productNode);

            totalAmount = totalAmount.add(
                    cartItem.getSoldPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            order.addOrderItem(orderItem);
        }

        order.setTotalAmount(totalAmount);
        orderRepository.save(order);

        cartItemRepository.deleteAllByUser(user);

        return new ApiResponse(true, order, "Order created");
    }

    public ApiResponse getOrders(UUID userId) {
        ApiResponse response;
        try {
            List<OrderListDTO> orders = OrderListDTO.toList(orderRepository.findByUser_id(userId));
            response = new ApiResponse(true, orders, "Orders fetched");
            return response;

        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse details(UUID orderId) {
        ApiResponse response;
        try {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
            response = new ApiResponse(true, order, "Orders fetched");
            return response;

        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse delete(UUID id) {
        ApiResponse response;
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found"));
            orderRepository.deleteById(id);
            response = new ApiResponse(true, null, "Orders deleted");
            return response;

        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

}
