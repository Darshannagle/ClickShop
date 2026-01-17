package com.dan.app.config;

public class Constant {

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
}