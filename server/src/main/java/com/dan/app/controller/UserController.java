package com.dan.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.UserDTO;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.types.User.UserType.userListData;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.User;
import com.dan.app.service.UserService;
import com.dan.app.utils.CustomUserDetails;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService doctorService;

	// list : [

	@GetMapping("/list")
	public ResponseEntity<ApiResponse<List<userListData>>> list() {
		try {

			ApiResponse<List<userListData>> response = doctorService.list();
			if (!response.isStatus()) {
				return new ResponseEntity<ApiResponse<List<userListData>>>(response, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<ApiResponse<List<userListData>>>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception : " + e);
			ApiResponse<List<userListData>> apiResponse = new ApiResponse<List<userListData>>(false, null,
					"Something went wrong",
					List.of(e.getLocalizedMessage()));
			return new ResponseEntity<ApiResponse<List<userListData>>>(apiResponse, HttpStatus.OK);
		}
	}
	// ] list

	// create : [

	@PostMapping("/create")
	public ResponseEntity<ApiResponse<User>> create(@RequestBody UserDTO doctorDTO) {
		try {

			ApiResponse<User> response = doctorService.create(doctorDTO);
			if (!response.isStatus()) {
				return new ResponseEntity<ApiResponse<User>>(response, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<ApiResponse<User>>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception : " + e);
			ApiResponse<User> apiResponse = new ApiResponse<User>(false, null, "Something went wrong",
					List.of(e.getLocalizedMessage()));
			return new ResponseEntity<ApiResponse<User>>(apiResponse, HttpStatus.OK);
		}
	}
	// ] create

	// details : [
	@GetMapping("/details")
	public ResponseEntity<ApiResponse> details(@AuthenticationPrincipal UserDetails userDetails,
			@RequestParam String id) {
		try {
			System.out.println("UserDetails:" + MapperConfig.toJson(userDetails));
			ApiResponse response = doctorService.details(id);
			if (!response.isStatus()) {
				return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception : " + e);
			ApiResponse<User> apiResponse = new ApiResponse<User>(false, null,
					"Something went wrong",
					List.of(e.getLocalizedMessage()));
			return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
		}
	}
	// ] details

	// update : [
	@PutMapping("/update")
	public ResponseEntity<ApiResponse> update(@RequestBody User data) {
		try {
			if (data.getId() == null) {
				throw new Exception("User Id is required");
			}
			ApiResponse response = doctorService.update(data.getId(), (data));
			if (!response.isStatus()) {
				return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Exception : " + e);
			ApiResponse<User> apiResponse = new ApiResponse<User>(false, null,
					"Something went wrong",
					List.of(e.getLocalizedMessage()));
			return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
		}
	}
	// ] update

	// get-profile : [
	@GetMapping("/get-profile")
	public ResponseEntity<ApiResponse> getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
		try {
			System.out.println("UserDetails:" + MapperConfig.toJson(userDetails));
			ApiResponse response = doctorService.details(userDetails.getId());
			if (!response.isStatus()) {
				return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Exception : " + e);
			ApiResponse<User> apiResponse = new ApiResponse<User>(false, null,
					"Something went wrong",
					List.of(e.getLocalizedMessage()));
			return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
		}
	}
	// ] get-profile
}