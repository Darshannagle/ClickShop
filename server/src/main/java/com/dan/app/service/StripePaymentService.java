package com.dan.app.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.stereotype.Service;

import com.dan.app.config.Constant;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.Constant.OrderStatus;
import com.dan.app.config.Constant.PaymentStatus;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Order;
import com.dan.app.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripePaymentService {

        public final OrderRepository orderRepository;
        public final Constant constant;

        public StripePaymentService(OrderRepository orderRepository, Constant constant) {
                this.orderRepository = orderRepository;
                this.constant = constant;
        }

        public ApiResponse createPaymentIntent(UUID orderId) {
                try {
                        Order order = orderRepository.findById(orderId)
                                        .orElseThrow(() -> new Exception("Order not found"));
                        SessionCreateParams params = SessionCreateParams.builder()
                                        .addAllPaymentMethodType(List.of(
                                                        // SessionCreateParams.PaymentMethodType.PAYPAL,
                                                        SessionCreateParams.PaymentMethodType.CARD))
                                        .setMode(SessionCreateParams.Mode.PAYMENT)
                                        .putMetadata("orderId", order.getId().toString())
                                        .setSuccessUrl(constant.APP_URL
                                                        + "/" + constant.STRIPE_SUCCESS_URL
                                                        + "/{CHECKOUT_SESSION_ID}")
                                        .setCancelUrl(constant.APP_URL
                                                        + "/" + constant.STRIPE_CANCEL_URL
                                                        + "/{CHECKOUT_SESSION_ID}")

                                        .addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
                                                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                                        .setCurrency("usd")
                                                                        .setUnitAmount(order.getTotalAmount()
                                                                                        .multiply(BigDecimal
                                                                                                        .valueOf(100))
                                                                                        .longValue())
                                                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                                                                        .builder()
                                                                                        .setName(order.getId()
                                                                                                        .toString())
                                                                                        .build())
                                                                        .build())

                                                        .build())
                                        .build();

                        Session session = Session.create(params);
                        Map<String, Object> data = new HashMap<>();
                        data.put("orderId", order.getId());
                        data.put("totalAmount", order.getTotalAmount());
                        data.put("sessionId", session.getId());
                        data.put("checkoutUrl", session.getUrl());
                        // save stripe session id in order table
                        order.setStripeSessionId(session.getId());
                        order.setPaymentStatus(PaymentStatus.PENDING);
                        orderRepository.save(order);
                        return new ApiResponse(true, data, "Checkout session created");
                } catch (StripeException e) {
                        System.out.println("Stripe Exception:" + e);
                        return new ApiResponse(false, null, "Stripe Exception: Something went wrong",
                                        List.of(e.getMessage()));
                } catch (Exception e) {
                        return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
                }
        }

        public ApiResponse confirmPayment(String session_id) {
                try {
                        Session session = Session.retrieve(session_id);
                        String orderIdStr = session.getMetadata().get("orderId");
                        if (orderIdStr == null || orderIdStr.isBlank()) {
                                throw new Exception("Order ID missing in Stripe session metadata");
                        }
                        UUID orderId = UUID.fromString(orderIdStr);
                        if (orderId == null) {
                                throw new Exception("Order not found");
                        }
                        Order order = orderRepository.findById(orderId)
                                        .orElseThrow(() -> new Exception("Order not found"));
                        order.setPaymentStatus(PaymentStatus.COMPLETED);
                        order.setOrderStatus(OrderStatus.PLACED);
                        orderRepository.save(order);
                        return new ApiResponse(true, null, "Payment confirmed");
                } catch (Exception e) {
                        return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
                }
        }

        public ApiResponse failedPayment(String session_id) {
                try {
                        Session session = Session.retrieve(session_id);
                        String orderIdStr = session.getMetadata().get("orderId");
                        if (orderIdStr == null || orderIdStr.isBlank()) {
                                throw new Exception("Order ID missing in Stripe session metadata");
                        }
                        UUID orderId = UUID.fromString(orderIdStr);
                        if (orderId == null) {
                                throw new Exception("Order not found");
                        }
                        Order order = orderRepository.findById(orderId)
                                        .orElseThrow(() -> new Exception("Order not found"));
                        order.setPaymentStatus(PaymentStatus.FAILED);
                        order.setOrderStatus(OrderStatus.CANCELLED);
                        orderRepository.save(order);
                        return new ApiResponse(true, null, "Payment confirmed");
                } catch (Exception e) {
                        return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
                }
        }
}
