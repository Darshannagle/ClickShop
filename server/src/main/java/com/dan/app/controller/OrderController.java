package com.dan.app.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.Order.OrderDTO;
import com.dan.app.config.Constant.PaymentMethod;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Order;
import com.dan.app.service.OrderService;
import com.dan.app.service.StripePaymentService;
import com.dan.app.utils.CustomUserDetails;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    public final OrderService orderService;
    public final StripePaymentService stripePaymentService;

    public OrderController(OrderService orderService, StripePaymentService stripePaymentService) {
        this.orderService = orderService;
        this.stripePaymentService = stripePaymentService;
    }

    // @Transactional
    @PostMapping("/create")
    public ResponseEntity create(@AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody OrderDTO orderDTO) {
        try {
            ApiResponse response = orderService.create(userDetails.getId(), orderDTO);
            if (response.isStatus()) {
                if (orderDTO.getPaymentMethod().equals(PaymentMethod.ONLINE)) {

                    ApiResponse paymentResponse = stripePaymentService
                            .createPaymentIntent(((Order) response.getData()).getId());

                    if (!paymentResponse.isStatus()) {
                        return new ResponseEntity(paymentResponse, HttpStatus.BAD_REQUEST);
                    } else {
                        return new ResponseEntity(paymentResponse, HttpStatus.OK);
                    }
                } else {
                    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            System.out.println("Exception : " + e);
            ApiResponse response = new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }
    }

    // @GetMapping("/list")
    // public ResponseEntity list(@AuthenticationPrincipal CustomUserDetails
    // userDetails) {
    // try {
    // ApiResponse response = orderService.getOrders(userDetails.getId());
    // return new ResponseEntity(response, HttpStatus.OK);
    // } catch (Exception e) {
    // ApiResponse response = new ApiResponse(false, null, "Something went wrong",
    // List.of(e.getMessage()));
    // return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    // }
    // }

    @GetMapping("/list")
    public ResponseEntity list(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            ApiResponse response = orderService.getOrders(userDetails.getId());
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam UUID id) {
        try {
            ApiResponse response = orderService.delete(id);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/details/{id}")
    public ResponseEntity details(@PathVariable UUID id) {
        try {
            ApiResponse response = orderService.details(id);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            ApiResponse response = new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

    }
}
