package com.dan.app.DTO;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationDTO {
    private long totalItems;
    private int totalPages;
    private int pageSize;
    private int currentPage;
    private boolean isLastPage;
    private boolean isFirstPage;
    private boolean hasNext;
    private boolean hasPrevious;
    private boolean last;

    public PaginationDTO(Page<?> page) {
        this.totalItems = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.pageSize = page.getSize();
        this.currentPage = page.getNumber() + 1; // 1-based index
        this.isLastPage = page.isLast();
        this.isFirstPage = page.isFirst();
        this.hasNext = page.hasNext();
        this.hasPrevious = page.hasPrevious();
        this.last = page.isLast();
    }

}
