package com.dan.app.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.dan.app.config.Constant.Gender;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "users")
@AllArgsConstructor
@Data
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(nullable = false)
	private UUID id;
	@Column(nullable = false)
	@NotBlank(message = "Full Name is required")
	private String fullName;
	@NotNull
	@Email
	@Column(unique = true, nullable = false)
	@NotBlank(message = "Email is required")
	private String email;
	@Column(nullable = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	@Column(nullable = true)
	@Pattern(regexp = "^[0-9]{10}$", message = "Invalid phone number")
	private String phone;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Column(nullable = true)
	private String location;
	@Column(nullable = true)
	private Long pinCode;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>(); // ← Change List → Set + initialize //
	// @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	// @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade =
	// CascadeType.ALL, orphanRemoval = true)
	// private List<Address> addresses = new ArrayList<>();

	// private LocalDateTime createdAt;
	// @UpdateTimestamp
	// private LocalDateTime updatedAt;

	public User() {
		super();
	}

	public User(String fullName, String email, String passwrd, String phone, Gender gender, String location,
			Long pinCode) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.gender = gender;
		this.location = location;
		this.pinCode = pinCode;
	}

	public User(String fullName, String email, String password, String phone,
			Gender gender, String location, Long pinCode, Set<Role> roles) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.gender = gender;
		this.location = location;
		this.pinCode = pinCode;
		this.roles = roles != null ? new HashSet<>(roles) : new HashSet<>();
	}
	// public User(String fullName, String email, String password, String phone,
	// String gender, String location,
	// Long pinCode, Set<Role> roles, List<Address> addresses) {
	// super();
	// this.fullName = fullName;
	// this.email = email;
	// this.password = password;
	// this.phone = phone;
	// this.gender = gender;
	// this.location = location;
	// this.pinCode = pinCode;
	// this.roles = roles;
	// this.addresses = addresses;
	// }
}
