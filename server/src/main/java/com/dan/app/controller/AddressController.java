package com.dan.app.controller;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.AddressDTO;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Address;
import com.dan.app.service.AddressService;
import com.dan.app.utils.CustomUserDetails;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/create")
    public ResponseEntity create(@AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody AddressDTO addressDTO) {
        try {
            addressDTO.setUser_id(userDetails.getId());
            ApiResponse apiResponse = addressService.create(addressDTO);
            System.out.println("apiResponse:" + apiResponse.toString());
            return new ResponseEntity(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage())),
                    HttpStatus.OK);
        }
    }

    @GetMapping("/list")
    public ResponseEntity list(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            ApiResponse apiResponse = addressService.list(userDetails.getId());
            System.out.println("apiResponse:" + apiResponse);
            return new ResponseEntity(apiResponse, HttpStatus.OK);
            // return new ResponseEntity(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody Address address) {
        try {
            ApiResponse apiResponse = addressService.update(address.getId(), address);
            return new ResponseEntity(apiResponse, HttpStatus.OK);
            // return new ResponseEntity(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam UUID id) {
        try {
            ApiResponse apiResponse = addressService.delete(id);
            return new ResponseEntity(apiResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage())),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
