package com.dan.app.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long user_id;
	private String fname;
	private String lname;
	private String password;
	private String email;
	private String location;
	private String address;
	private String number;
	private Long pincode;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<CartItem> items = new ArrayList<CartItem>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Orders> Orders = new ArrayList<>();

	public User(String fname, String lname, String password, String email, String location, String address,
			String number, Long pincode) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.email = email;
		this.location = location;
		this.address = address;
		this.number = number;
		this.pincode = pincode;
	}

}
