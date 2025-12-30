package com.dan.app.config;

public class Constant {

    public enum Gender {
        MALE("Male"),
        FEMALE("Female"),
        OTHERS("Others");

        private final String label;

        Gender(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public Gender getGender(String gender) {
            return Gender.valueOf(gender.toUpperCase());
        }
    }

    public enum AddressType {

        HOME(""),
        FEMALE("Female"),
        OTHERS("Others");

        private final String label;

        AddressType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public Gender getGender(String gender) {
            return Gender.valueOf(gender.toUpperCase());
        }
    }

}
