package com.dan.app.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JWTResponseDTO {
    private String accessToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
