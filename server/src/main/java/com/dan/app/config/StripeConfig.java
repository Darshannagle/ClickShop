package com.dan.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.stripe.Stripe;

import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {

    @Value("${stripe.secret-key}")
    public String secretKey;

    @Value("${stripe.public-key}")
    public String publicKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }
}
