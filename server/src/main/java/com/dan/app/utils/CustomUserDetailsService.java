package com.dan.app.utils;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dan.app.model.User;
import com.dan.app.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email)
			throws UsernameNotFoundException {

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		// List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
		// .map(role -> new SimpleGrantedAuthority(
		// "ROLE_" + role.getName() // 🔥 PREFIX HERE
		// ))
		// .toList();

		// return new org.springframework.security.core.userdetails.User(

		// user.getEmail(),
		// user.getPassword(),
		// authorities);
		return new CustomUserDetails(user);

	}

}
