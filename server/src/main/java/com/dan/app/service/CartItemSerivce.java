package com.dan.app.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dan.app.DTO.CartItemDTO;
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
    private final UserService userSerivce;
    private final ProductService productService;
    private final EntityManager entityManager;

    public CartItemSerivce(CartItemRepository cartItemRepository, UserService userSerivce,
            ProductService productService, EntityManager entityManager) {
        this.cartItemRepository = cartItemRepository;
        this.userSerivce = userSerivce;
        this.productService = productService;
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
                        .findByUser_idAndProduct_id(cartItemDTO.getUser_id(), cartItemDTO.getProduct_id());
                if (existingCartItem != null) {
                    existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemDTO.getQuantity());
                    existingCartItem.setSoldPrice(cartItemDTO.getSoldPrice());
                    existingCartItem = cartItemRepository.save(existingCartItem);
                    return new ApiResponse(true, existingCartItem, "Cart item updated");
                }
                // User user = (User) userSerivce.details(cartItemDTO.getUser_id(),
                // false).getData();
                // Product product = (Product)
                // productService.details(cartItemDTO.getProduct_id()).getData();
                User user = entityManager.getReference(User.class, cartItemDTO.getUser_id());
                Product product = entityManager.getReference(Product.class, cartItemDTO.getProduct_id());
                CartItem cartItem = new CartItem();
                cartItem.setUser(user);
                cartItem.setProduct(product);
                cartItem.setQuantity(cartItemDTO.getQuantity());
                cartItem.setSoldPrice(cartItemDTO.getSoldPrice());
                cartItem = cartItemRepository.save(cartItem);
                return new ApiResponse(true, MapperConfig.toJson(cartItem), "Cart item created");
            }

        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse getCart(UUID userId) {
        try {
            List<CartItem> cartItem = cartItemRepository.findByUser_id(userId);
            if (cartItem == null) {
                return new ApiResponse(false, null, "Cart not found");
            } else {
                return new ApiResponse(true, cartItem, "Cart fetched");
            }

        } catch (

        Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

}
