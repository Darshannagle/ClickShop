package com.dan.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.stereotype.Service;

import com.dan.app.DTO.CartItemDTO;
import com.dan.app.config.Constant;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.CartItem;
import com.dan.app.model.Product;
import com.dan.app.model.User;
import com.dan.app.repository.CartItemRepository;

import jakarta.persistence.EntityManager;

@Service
public class CartItemSerivce {

    private final CartItemRepository cartItemRepository;
    // private final UserService userSerivce;
    // private final ProductService productService;
    private final EntityManager entityManager;

    public CartItemSerivce(CartItemRepository cartItemRepository, UserService userSerivce,
            ProductService productService, EntityManager entityManager) {
        this.cartItemRepository = cartItemRepository;
        // this.userSerivce = userSerivce;
        // this.productService = productService;
        this.entityManager = entityManager;
    }

    public ApiResponse create(CartItemDTO cartItemDTO) {
        try {
            if (cartItemDTO.getUser_id() == null) {
                return new ApiResponse(false, null, "User not found");
            } else if (cartItemDTO.getProduct_id() == null) {
                return new ApiResponse(false, null, "Product not found");
            } else {
                // check if cart with user and product already exists
                CartItem existingCartItem = cartItemRepository
                        .findByUser_idAndProduct_id((UUID) cartItemDTO.getUser_id(),
                                (UUID) cartItemDTO.getProduct_id());
                Product product = entityManager.getReference(Product.class, cartItemDTO.getProduct_id());
                if (existingCartItem != null) {
                    existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemDTO.getQuantity());
                    // existingCartItem.setSoldPrice((cartItemDTO.getSoldPrice()));
                    existingCartItem = cartItemRepository.save(existingCartItem);
                    return new ApiResponse(true, existingCartItem, "Cart item updated");
                }
                User user = entityManager.getReference(User.class, cartItemDTO.getUser_id());
                CartItem cartItem = new CartItem();
                cartItem.setUser(user);
                cartItem.setProduct(product);
                cartItem.setQuantity(cartItemDTO.getQuantity());
                cartItem.setSoldPrice(cartItemDTO.getSoldPrice());
                cartItem = cartItemRepository.save(cartItem);
                // cartItem = entityManager.getReference(CartItem.class, cartItem.getId());
                return new ApiResponse(true, null, "Cart item created");
            }

        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse getCart(UUID userId) {
        try {
            List<CartItem> cartItems = cartItemRepository.findByUser_id(userId);
            double subTotal = cartItems.stream()
                    .reduce(0.0, (a, b) -> a + b.getQuantity() * b.getSoldPrice().doubleValue(), Double::sum);
            Map<String, Object> data = new HashMap<>();
            Integer estimatedTax = Constant.ESTIMATED_TAX;
            Integer estimatedShipping = Constant.ESTIMATED_SHIPPING;
            data.put("records", cartItems);
            data.put("estimatedTax", estimatedTax);
            data.put("estimatedShipping", estimatedShipping);
            data.put("subTotal", subTotal);
            data.put("total", subTotal + estimatedTax + estimatedShipping);
            // if (cartItems == null) {
            // return new ApiResponse(false, null, "Cart not found");
            // } else {
            return new ApiResponse(true, data, "Cart fetched");
            // }

        } catch (

        Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse setQuantity(UUID cartId, Integer quantity) {
        try {
            CartItem cartItem = cartItemRepository.findById(cartId).orElse(null);
            if (cartItem == null) {
                return new ApiResponse(false, null, "Cart Item not found");
            } else {
                cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);
                return new ApiResponse(true, cartItem, "Cart fetched");
            }

        } catch (

        Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse delete(UUID cartId) {
        try {
            CartItem cartItem = cartItemRepository.findById(cartId).orElse(null);
            if (cartItem == null) {
                return new ApiResponse(false, null, "Cart Item not found");
            } else {
                cartItemRepository.delete(cartItem);
                return new ApiResponse(true, null, "Cart deleted");
            }

        } catch (

        Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

}
