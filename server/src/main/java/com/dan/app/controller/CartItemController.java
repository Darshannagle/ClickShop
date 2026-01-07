package com.dan.app.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity getCart(@RequestParam UUID userId) {
        try {
            ApiResponse response = cartItemSerivce.getCart(userId);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

}
