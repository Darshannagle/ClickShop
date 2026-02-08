package com.dan.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class Constant {
    @Value("${app.url}")
    public String APP_URL;

    @Value("${stripe.success}")
    public String STRIPE_SUCCESS_URL;

    @Value("${stripe.cancel}")
    public String STRIPE_CANCEL_URL;

    public static Integer ESTIMATED_TAX = 50;
    public static Integer ESTIMATED_SHIPPING = 150;

    public enum Gender {
        MALE("MALE", "Male"),
        FEMALE("FEMALE", "Female"),
        OTHERS("OTHERS", "Others");

        private final String key;
        private final String label;

        Gender(String key, String label) {
            this.key = key;
            this.label = label;
        }

        public String getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        // Safe lookup by key or label
        public static Gender from(String value) {
            if (value == null) {
                throw new IllegalArgumentException("Gender value cannot be null");
            }
            for (Gender g : Gender.values()) {
                if (g.key.equalsIgnoreCase(value) || g.label.equalsIgnoreCase(value)) {
                    return g;
                }
            }
            throw new IllegalArgumentException("Invalid gender: " + value);
        }
    }

    public enum AddressType {
        HOME("HOME", "Home"),
        OFFICE("OFFICE", "Office");

        private final String key;
        private final String label;

        AddressType(String key, String label) {
            this.key = key;
            this.label = label;
        }

        public String getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        // Safe lookup by key or label
        public static AddressType from(String value) {
            if (value == null) {
                throw new IllegalArgumentException("AddressType value cannot be null");
            }
            for (AddressType a : AddressType.values()) {
                if (a.key.equalsIgnoreCase(value) || a.label.equalsIgnoreCase(value)) {
                    return a;
                }
            }
            throw new IllegalArgumentException("Invalid address type: " + value);
        }
    }

    public enum OrderStatus {
        PENDING("PENDING", "Pending"),
        PLACED("PLACED", "Placed"),
        SHIPPED("SHIPPED", "Shipped"),
        DELIVERED("DELIVERED", "Delivered"),
        CANCELLED("CANCELLED", "Cancelled");

        private final String key;
        private final String label;

        OrderStatus(String key, String label) {
            this.key = key;
            this.label = label;
        }

        public String getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        // Safe lookup by key or label
        public static OrderStatus from(String value) {
            if (value == null) {
                throw new IllegalArgumentException("OrderStatus value cannot be null");
            }
            for (OrderStatus o : OrderStatus.values()) {
                if (o.key.equalsIgnoreCase(value) || o.label.equalsIgnoreCase(value)) {
                    return o;
                }
            }
            throw new IllegalArgumentException("Invalid order status: " + value);
        }
    }

    public enum PaymentStatus {
        PENDING("PENDING", "Pending"),
        CREATED("CREATED", "Created"),
        COMPLETED("COMPLETED", "Completed"),
        FAILED("FAILED", "Failed");

        private final String key;
        private final String label;

        PaymentStatus(String key, String label) {
            this.key = key;
            this.label = label;
        }

        public String getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        // Safe lookup by key or label
        public static PaymentStatus from(String value) {
            if (value == null) {
                throw new IllegalArgumentException("Payment Status value cannot be null");
            }
            for (PaymentStatus p : PaymentStatus.values()) {
                if (p.key.equalsIgnoreCase(value) || p.label.equalsIgnoreCase(value)) {
                    return p;
                }
            }
            throw new IllegalArgumentException("Invalid gender: " + value);
        }
    }

    public enum PaymentMethod {
        CASH("CASH", "Cash"),
        ONLINE("ONLINE", "Online");

        private final String key;
        private final String label;

        PaymentMethod(String key, String label) {
            this.key = key;
            this.label = label;
        }

        public String getKey() {
            return key;
        }

        public String getLabel() {
            return label;
        }

        // Safe lookup by key or label
        public static PaymentMethod from(String value) {
            if (value == null) {
                throw new IllegalArgumentException("Payment Method value cannot be null");
            }
            for (PaymentMethod p : PaymentMethod.values()) {
                if (p.key.equalsIgnoreCase(value) || p.label.equalsIgnoreCase(value)) {
                    return p;
                }
            }
            throw new IllegalArgumentException("Invalid payment method: " + value);
        }
    }
}