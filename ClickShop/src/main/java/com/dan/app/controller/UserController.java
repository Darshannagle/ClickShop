package com.dan.app.controller;

import java.util
.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.LoginDTO;
import com.dan.app.model.User;
import com.dan.app.service.userService;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private userService uService;

	@GetMapping("/users")
	public List<User> getAll() {
		List<User> users = uService.getUsers();
		return users;
	}

	@GetMapping("/user/{user_id}")
	public ResponseEntity<User> getUserbyId(@PathVariable Long user_id) {
		User user = uService.getUserbyId(user_id);
		if (user!=null) {
			return new ResponseEntity<User>(user,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(user,HttpStatus.INTERNAL_SERVER_ERROR);
				
		}
	}
	
	@PostMapping("/registration")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		System.out.println("user before adding :" + user.toString());
		user = uService.registerUser(user);
		return new ResponseEntity<User>(user, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> Login(@RequestBody LoginDTO dLoginDTO) {
		ResponseEntity<Map<String, Object>> response = uService.login(dLoginDTO);

		return response;
	}
//	========================================================

//	{
//        "product_id": 1,
//        "title": "Smartphone",
//        "price": 599,
//        "category": "Electronics",
//        "image": "https://example.com/images/smartphone.jpg",
//        "image": "4.5",
//        "rate_count": 10,
//        "stock": 100,
//        "subcategory": "BrandX"
//    },	

}
