package com.dan.app.utils;

import org.springframework.data.domain.Page;

import com.dan.app.DTO.PaginationDTO;

public class Common {

    public static PaginationDTO buildPagination(Page<?> page) {
        PaginationDTO dto = new PaginationDTO();
        dto.setTotalItems(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        dto.setPageSize(page.getSize());
        dto.setCurrentPage(page.getNumber() + 1); // 1-based index
        dto.setLastPage(page.isLast());
        dto.setFirstPage(page.isFirst());
        dto.setHasNext(page.hasNext());
        dto.setHasPrevious(page.hasPrevious());
        return dto;
    }

}