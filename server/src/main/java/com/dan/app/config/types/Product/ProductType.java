package com.dan.app.config.types.Product;

import java.util.List;

public class ProductType {

    public interface productListData {
        Long getId();

        String getName();

        String getBrand();

        String getCategory();

        String getSubCategory();

        List<String> getImages();
    }

    public interface productDetailsData {
        Long getId();

        String getName();

        String getBrand();

        String getCategory();

        String getSubCategory();

        List<String> getImages();

    }
}
