package com.dan.app.service;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.dan.app.DTO.AddressDTO;
import com.dan.app.config.Constant.AddressType;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.Address;
import com.dan.app.model.CartItem;
import com.dan.app.model.User;
import com.dan.app.repository.AddressRepository;
import com.dan.app.repository.UserRepository;

import jakarta.validation.constraints.NotNull;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public static final Logger log = LoggerFactory.getLogger(AddressService.class);

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;

    }

    public ApiResponse create(AddressDTO addressDTO) {
        try {

            User user = userRepository.findById(addressDTO.getUser_id())
                    .orElseThrow(() -> new Exception("User not found"));

            Address address = new Address(user, addressDTO.getAddressLine1(), addressDTO.getAddressLine2(),
                    addressDTO.getCity(), addressDTO.getState(), addressDTO.getCountry(), addressDTO.getPinCode(),
                    AddressType.valueOf(addressDTO.getAddressType()));
            addressRepository.save(address);
            return new ApiResponse(true, address, "Address created successfully");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }

    public ApiResponse list(UUID userId) {
        try {
            List<Address> addresses = addressRepository.findByUser_id(userId);
            return new ApiResponse(true, addresses, "Addresses retrieved successfully");
            // } catch (DataAccessException e) {
            // For database-related issues
            // return new ApiResponse(false, null, "Database error occurred",
            // List.of(e.getMessage()));
        } catch (Exception e) {
            // Fallback for unexpected errors
            return new ApiResponse(false, null, "Unexpected error occurred", List.of(e.getMessage()));
        }
    }

    public ApiResponse update(@NotNull UUID id, @NotNull Address address) {
        try {
            log.info("address:" + address);
            Address existingAddress = addressRepository.findById(id)
                    .orElseThrow(() -> new Exception("Address not found"));
            log.info("userId" + existingAddress.getUser().getId());
            log.info("addressID" + address.getId());
            if (address.isDefault() == true) {
                addressRepository.clearOtherDefaults((UUID) existingAddress.getUser().getId(), (UUID) address.getId());
            }
            BeanUtils.copyProperties(address, existingAddress, "id", "user", "createdAt", "updatedAt");
            addressRepository.save(existingAddress);
            return new ApiResponse(true, existingAddress, "Address updated");
        } catch (Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e));
        }
    }

    public ApiResponse delete(UUID addressId) {
        try {
            Address address = addressRepository.findById(addressId)
                    .orElseThrow(() -> new Exception("Address not found"));
            addressRepository.delete(address);
            return new ApiResponse(true, null, "Address deleted");

        } catch (

        Exception e) {
            return new ApiResponse(false, null, "Something went wrong", List.of(e.getMessage()));
        }
    }
}
