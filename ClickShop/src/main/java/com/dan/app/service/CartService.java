package com.dan.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dan.app.DAO.CartDAO;
import com.dan.app.DAO.ProductDAO;
import com.dan.app.DAO.UserDAO;
import com.dan.app.DTO.CartDTO;
import com.dan.app.model.CartItem;
import com.dan.app.model.User;

@Service
public class CartService {

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private CartDAO cartDAO;
	
	@Autowired
	private ProductDAO productDAO;
	
	public User addUser(User user) {
		user = userDAO.save(user);
		return user;
	}
	public List<User> getAllUsers() {
		List<User> users = userDAO.findAll();
		return users;
	}
	public User getUserbyId(Long id) {
		Optional<User> user = userDAO.findById(id);
		
		if (user.isPresent()) {
			return user.get();
		} else {
return null;
		}
	}
	
	
	public List<CartItem> getCartItems(){
		List<CartItem> items = cartDAO.findAll();
		return items;
	}

	public List<CartItem> getCartItemsbyUser(Long userId){
		List<CartItem> items = cartDAO.findCartByUser(userId);
		return items;
	}
	
	public CartItem addCart(CartDTO cartDTO) {
		
		CartItem item = new CartItem();
		item.setProduct(productDAO.findById(cartDTO.getProduct_id()).get());
		item.setQuantity(cartDTO.getQuantity());
		item.setUser(getUserbyId(cartDTO.getUser_id()));
		item= cartDAO.save(item);
		return item;
	}

	

	
	
	
}
