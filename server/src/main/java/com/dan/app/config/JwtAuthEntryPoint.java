package com.dan.app.config;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException {
        try {

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            PrintWriter writer = response.getWriter();
            writer.write("{\"success\":false,\"message\":\"Unauthorized or Invalid Token:\"}");
            writer.flush();

        } catch (Exception e) {
            PrintWriter writer = response.getWriter();
            writer.write("{\"success\":false,\"message\":\"Something went wrong\",\"error\":\"e.getMessage()\"}");
            writer.flush();
        }
    }
}