package com.dan.app.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubCategoryDTO {
    private String name;
    private String categoryId;
}
