package com.dan.app.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dan.app.DAO.CartDAO;
import com.dan.app.DAO.UserDAO;
import com.dan.app.DTO.CartDTO;
import com.dan.app.model.CartItem;
import com.dan.app.model.Product;
import com.dan.app.model.User;

//import com.Dan.Shopsify.model.CartDTO;
//import com.Dan.Shopsify.model.CartItem;
//import com.Dan.Shopsify.model.Product;
//import com.Dan.Shopsify.respository.CartDAO;
//import com.Dan.Shopsify.respository.ProductDAO;

@Service
public class ProductService {

	@Autowired
	private com.dan.app.DAO.ProductDAO productDAO;
	
	@Autowired
	private CartDAO cartDAO;
	@Autowired
	private UserDAO userDAO;
	
	public CartItem DTOItemMapper(CartDTO dto) {
		Product product = productDAO.findById(dto.getProduct_id()).orElse(null);
		User user = userDAO.findById(dto.getUser_id()).orElse(null);
		CartItem item = new CartItem(product, user, dto.getQuantity());
		return item;
}
	
	public List<Product> getAllProducts() {
		List<Product> products = productDAO.findAll();
		return products;
	}
	
	public List<Product> getAllProductsByCategory(String category) {
		List<Product> products = productDAO.findByCategory(category);
		return products;
	}
	
public Product getProduct(Long id) {
	if (productDAO.existsById(id)) {
		return productDAO.findById(id).get();
	} else {
return null;
	}
}
	
	public Product  addProduct(Product product) {
		
		return productDAO.save(product);
	}
	public List<CartItem> getCartItems() {
		return cartDAO.findAll();
	}

	public List<Product> getProducts() {
		return productDAO.findAll();
	}
	public void deleteProduct(Long id)
	{
		productDAO.deleteById(id);
	}
	public List<CartItem> addItem(CartItem item) {
		cartDAO.save(item);
		return cartDAO.findAll();
	}

	
	public CartItem addItems(CartDTO dto) {
		       
	if (!cartDAO.existsByProduct(getProduct(dto.getProduct_id()))){
		CartItem item = DTOItemMapper(dto);
		item =	cartDAO.save(item);
return item;
		
	} else {
return null;
	}
		
	}

	public boolean deleteItem(Long itemId) {
		if (cartDAO.existsById(itemId)) {
			cartDAO.deleteById(itemId);
			return true;
		} else
			return false;
	}
	public void deleteAll() {
		cartDAO.deleteAll();
	}

	
}
