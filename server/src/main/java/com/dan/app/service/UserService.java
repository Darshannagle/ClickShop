package com.dan.app.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.dan.app.config.types.User.UserType.userListData;
import com.dan.app.config.MapperConfig;
import com.dan.app.config.Constant.Gender;
import com.dan.app.config.types.api.ApiResponse;
import com.dan.app.model.User;
import com.dan.app.DTO.UserDTO;
import com.dan.app.repository.UserRepository;

import jakarta.validation.constraints.NotNull;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MapperConfig mapperConfig;

	public User dTOMapper(UserDTO userDTO) {
		// User User = UserRepository.findById(null)
		User user = new User();
		user.setFullName(userDTO.getFullName());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setPhone(userDTO.getPhone());
		user.setGender(Gender.from(userDTO.getGender()));
		user.setLocation(userDTO.getLocation());
		user.setPinCode(userDTO.getPinCode());
		return user;
	}

	// list : [
	public ApiResponse<List<userListData>> list() {
		try {
			List<userListData> data = userRepository.list();
			ApiResponse<List<userListData>> response = new ApiResponse<List<userListData>>(true, data,
					"Users fetched successfully");
			return response;
		} catch (Exception e) {
			// TODO: handle exception
			ApiResponse<List<userListData>> response = new ApiResponse<List<userListData>>(false, null,
					"Something went wrong", List.of(e.getLocalizedMessage()));
			return response;
		}
	}
	// ] list

	// create : [
	public ApiResponse<User> create(UserDTO userDTO) {
		try {

			User existingUser = userRepository.findByEmail(userDTO.getEmail()).orElse(null);
			if (existingUser != null) {

				throw new Exception("Email is already registered");
			}
			User user = dTOMapper(userDTO);
			if (user == null) {
				return new ApiResponse<User>(false, null, "User not created");

			}
			user = userRepository.save(user);

			ApiResponse<User> apiResponse = new ApiResponse<User>(true, user, "User created successfully");

			return apiResponse;

		} catch (Exception e) {
			return new ApiResponse<User>(false, null, e.getMessage(), List.of(e.getLocalizedMessage()));
		}
	}
	// ] create

	// details : [
	public ApiResponse details(@NonNull UUID id, boolean asJson) {
		try {

			Optional<User> existingUser = userRepository.findById(id);
			if (existingUser.isEmpty()) {
				throw new Exception("User not found");
			}
			ApiResponse<User> apiResponse;
			if (asJson) {
				Map<String, Object> user = MapperConfig.toJson(existingUser.get());
				apiResponse = new ApiResponse(true, user, "User created successfully");
			} else {
				apiResponse = new ApiResponse(true, existingUser.get(), "User fetched successfully");
			}
			return apiResponse;

		} catch (Exception e) {
			return new ApiResponse(false, null, e.getMessage(), List.of(e.getLocalizedMessage()));
		}
	}
	// ] details

	// update : [
	public ApiResponse<Map<String, Object>> update(@NotNull UUID id, @NotNull User body) {
		try {

			User existingUser = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));

			BeanUtils.copyProperties(body, existingUser, "id", "email", "password");
			userRepository.save(existingUser);
			ApiResponse<Map<String, Object>> apiResponse = new ApiResponse<Map<String, Object>>(true,
					MapperConfig.toJson(existingUser), "User updated successfully");

			return apiResponse;

		} catch (Exception e) {
			return new ApiResponse<Map<String, Object>>(false, null, e.getMessage(), List.of(e.getLocalizedMessage()));
		}
	}
	// ] update

	// details : [
	public ApiResponse getProfile(@NonNull UUID id) {
		try {

			Optional<User> existingUser = userRepository.findById(id);
			if (existingUser.isEmpty()) {
				throw new Exception("User not found");
			}

			Map<String, Object> user = MapperConfig.toJson(existingUser.get());
			ApiResponse<User> apiResponse = new ApiResponse(true, user, "User created successfully");
			return apiResponse;

		} catch (Exception e) {
			return new ApiResponse(false, null, e.getMessage(), List.of(e.getLocalizedMessage()));
		}
	}
	// ] details

}
