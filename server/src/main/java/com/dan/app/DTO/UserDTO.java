package com.dan.app.DTO;

import java.util.List;
import java.util.Set;

import com.dan.app.model.Address;
import com.dan.app.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
	private String fullName;
	private String email;
	private String password;
	private String phone;
	private String gender;
	private String location;
	private Long pinCode;
	private Set<Role> roles;
	private List<Address> addresses;
}
