package com.dan.app.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.CartItemDTO;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.service.CartItemSerivce;
import com.dan.app.utils.CustomUserDetails;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {

    private final CartItemSerivce cartItemSerivce;

    public CartItemController(CartItemSerivce cartItemSerivce) {
        this.cartItemSerivce = cartItemSerivce;
    }

    @PostMapping("/create")
    public ResponseEntity create(@AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CartItemDTO cartItemDTO) {
        try {
            cartItemDTO.setUser_id(userDetails.getId());
            ApiResponse response = cartItemSerivce.create(cartItemDTO);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-cart")
    public ResponseEntity getCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            ApiResponse response = cartItemSerivce.getCart(UUID.fromString(userDetails.getId().toString()));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/set-quantity")
    public ResponseEntity getCart(@RequestBody Map<String, Object> body) {
        try {
            if (body.get("cart_id") == null) {
                return new ResponseEntity(new ApiResponse(false, null, "Cart Id not provided."),
                        HttpStatus.BAD_REQUEST);
            } else if (body.get("quantity") == null) {
                return new ResponseEntity(new ApiResponse(false, null, "Cart quantity not provided."),
                        HttpStatus.BAD_REQUEST);
            }

            ApiResponse response = cartItemSerivce.setQuantity(UUID.fromString(body.get("cart_id").toString()),
                    Integer.parseInt(body.get("quantity").toString()));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestBody Map<String, Object> body) {
        try {
            UUID cartId = UUID.fromString(body.get("id").toString());
            if (cartId == null) {
                return new ResponseEntity(new ApiResponse(false, null, "Cart Id not provided."),
                        HttpStatus.BAD_REQUEST);
            }

            ApiResponse response = cartItemSerivce.delete(cartId);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

}
