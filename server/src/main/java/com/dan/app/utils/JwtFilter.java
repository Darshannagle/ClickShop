package com.dan.app.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dan.app.config.PublicRoutes;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        try {

            String requestPath = request.getServletPath();

            if (isPermitAll(requestPath)) {
                OptionalTokenHandling(request, response);
                filterChain.doFilter(request, response);
                return;
            }

            String authHeader = request.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {

                String token = authHeader.substring(7);
                System.out.println("token : " + token);

                String username = jwtUtil.extractUsername(token);

                // System.out.println("JwtFilter.doFilterInternal()");
                System.out.println("username: " + username);
                if (username != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                    CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
                    System.out.println("userDetails:" + userDetails);
                    if (jwtUtil.validateToken(token, userDetails)) {
                        System.out.println(
                                "jwtUtil.validateToken(token, userDetails): "
                                        + jwtUtil.validateToken(token, userDetails));

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request));

                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(authToken);
                    } else {

                        // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        // response.setContentType("application/json");
                        // response.getWriter().write("{\"message\":\"Invalid token\"}");

                        writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                        return;
                    }

                }
            }
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {

            // request.setAttribute("jwt_error", "Token has expired. Please login again.");
            // SecurityContextHolder.clearContext();
            // throw new InsufficientAuthenticationException("Your session is expired please
            // login", e);

            // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // response.setContentType("application/json");
            // response.getWriter()
            // .write("{\"status\":false,\"data\":null, \"message\":\"Your session is
            // expired, please login\"}");

            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Your session is expired, please login");
        } catch (Exception e) {
            logger.error("Error while validating token: {}" + e.getMessage());

            // response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // response.setContentType("application/json");
            // response.getWriter().write("{\"message\":\"Invalid token\"}");

            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
        }
    }

    private void OptionalTokenHandling(HttpServletRequest request, HttpServletResponse response) {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer "))
            return;

        try {
            String token = header.substring(7);
            String email = jwtUtil.extractUsername(token);

            UserDetails user = userDetailsService.loadUserByUsername(email);

            if (jwtUtil.validateToken(token, user)) {
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                user, null, user.getAuthorities()));
            }

        } catch (JwtException ignored) {
            // ❌ IGNORE EVERYTHING for public routes
        }
    }

    /*
     * Check if the given path is allowed to access without authentication.
     * 
     * @param path the path to check
     * 
     * @return true if the path is allowed to access without authentication, false
     * otherwise
     */
    private boolean isPermitAll(String path) {
        return Arrays.stream(PublicRoutes.PUBLIC_URLS).anyMatch(pattern -> pathMatcher.match(pattern, path));
    }

    public void writeErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write("{\"status\":false,\"message\":\"" + message + "\"}");
        writer.flush();
    }
}
