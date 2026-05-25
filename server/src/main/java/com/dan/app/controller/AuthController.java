package com.dan.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.dan.app.DTO.AuthRequestDTO;
import com.dan.app.DTO.UserDTO;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.service.AuthService;
import com.dan.app.utils.JwtUtil;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
            JwtUtil jwtUtil, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequestDTO request) {
        ApiResponse response;
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));

            String token = jwtUtil.generateToken(authentication);
            response = new ApiResponse(true, token, "Login successfull");
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            response = new ApiResponse(false, null, "Invalid Email or Password");
            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(
            @RequestBody UserDTO request) {
        ApiResponse response;
        try {

            response = authService.signup(request);
            return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
        } catch (Exception e) {
            response = new ApiResponse(false, null, "Something went wrong", List.of(e.getLocalizedMessage()));
            return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
