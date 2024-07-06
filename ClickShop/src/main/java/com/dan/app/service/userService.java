package com.dan.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dan.app.DAO.UserDAO;
import com.dan.app.DTO.LoginDTO;
import com.dan.app.model.User;
//
//import com.dan.app.DAO.UserDAO;
//import com.dan.app.DTO.LoginDTO;
//import com.dan.app.model.User;
@Service
public class userService {

	@Autowired
	private UserDAO userRepository;

	public User registerUser(User user) {
		return userRepository.save(user);
	}

	public List<User> getUsers() {
		List<User> users = userRepository.findAll();
		return users;
	}

	public User getUserbyId(Long user_id) {
		
		Optional<User> user = userRepository.findById(user_id);
		if (user.isPresent()) {
			return user.get();
		}
		return null;
	} 
	
	
	public ResponseEntity<Map<String, Object>> login(LoginDTO dto) {
		
		Map<String, Object> response = new HashMap<String, Object>();
		
		
		if (userRepository.existsByEmailAndPassword(dto.getEmail(),dto.getPassword())) {

			response.put("message", "Login Successful");
			response.put("email",dto.getEmail());
			Long user_id = userRepository.getUserIDbyEmail(dto.getEmail());
			System.out.println(user_id);
			response.put("user_id", user_id);
//			response.put(userRepository.findByEmail(dto.getEmail()).get(0));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

		}
		else {
			response.put("message","invalid email and password");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatusCode.valueOf(500));
		}

		
		
		
	}
}
