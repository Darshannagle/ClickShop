package com.dan.app.config;

public class Constant {

    public enum Gender {
        MALE("Male", "Male"),
        FEMALE("Female", "Female"),
        OTHERS("Others", "Others");

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

        public Gender getGender(String gender) {
            return Gender.valueOf(gender.toUpperCase());
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

        // get from key
        public AddressType getAddressType(String key) {
            return AddressType.valueOf(key.toUpperCase());
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

        // get from key
        public OrderStatus getOrderStatus(String key) {
            return OrderStatus.valueOf(key.toUpperCase());
        }

    }
}
