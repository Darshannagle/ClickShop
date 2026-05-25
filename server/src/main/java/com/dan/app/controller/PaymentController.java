package com.dan.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.PaymentConofirmDTO;
import com.dan.app.config.Constant;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.service.StripePaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    public final StripePaymentService stripePaymentService;
    public final Constant constant;

    public final String STRIPE_SUCCESS_URL;
    public final String STRIPE_CANCEL_URL;

    public PaymentController(StripePaymentService stripePaymentService, Constant constant) {
        this.stripePaymentService = stripePaymentService;
        this.constant = constant;

        this.STRIPE_SUCCESS_URL = constant.getSTRIPE_SUCCESS_URL();
        this.STRIPE_CANCEL_URL = constant.getSTRIPE_CANCEL_URL();
    }

    // public final String STRIPE_SUCCESS_URL = this.constant.STRIPE_SUCCESS_URL;
    // public final String STRIPE_CANCEL_URL = this.constant.STRIPE_CANCEL_URL;

    @PostMapping("/confirm/{url}")
    public ResponseEntity confirm(@PathVariable("url") String url, @RequestBody PaymentConofirmDTO paymentConofirmDTO) {
        ApiResponse response;
        try {
            String session_id = paymentConofirmDTO.getSession_id();
            if (session_id == null) {
                return new ResponseEntity(ApiResponse.builder().status(false).data(null).message("Something went wrong")
                        .errors(List.of("Invalid url"))
                        .build(), HttpStatus.BAD_REQUEST);
            }
            System.out.println("url: " + url);
            if (url.equals(STRIPE_SUCCESS_URL)) {
                response = stripePaymentService.confirmPayment(session_id);

            } else if (url.equals(STRIPE_CANCEL_URL)) {
                response = stripePaymentService.failedPayment(session_id);
            } else {
                return new ResponseEntity(ApiResponse.builder().status(false).data(null).message("Something went wrong")
                        .errors(List.of("Invalid url"))
                        .build(), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity(ApiResponse.builder().status(false).data(null).message("Something went wrong")
                    .errors(List.of(e.getMessage()))
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

}
