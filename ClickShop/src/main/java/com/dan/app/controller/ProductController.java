package com.dan.app.controller;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dan.app.DTO.CartDTO;
import com.dan.app.model.CartItem;
import com.dan.app.model.Product;
import com.dan.app.model.Orders;
import com.dan.app.service.CartService;
import com.dan.app.service.OrderService;
import com.dan.app.service.ProductService;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	ProductService productService;
@Autowired
OrderService orderService;

@Autowired
private CartService cartService;
	
	@GetMapping("/products")
	public List<Product> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		return products;
	}

	@GetMapping("/products/{category}")
	public List<Product> get(@PathVariable("category") String subCat) {
		List<Product> products = productService.getAllProductsByCategory(subCat);
		return products;

	}

	@PostMapping("/addAll")
	public List<Product> addAllProducts(@RequestBody List<Product> products) {

		for (Product product : products) {
			productService.addProduct(product);
		}

		return products;
	}
	@GetMapping("/Cart")
	public List<CartItem> getCartItems() {
		return productService.getCartItems();
	}
	@GetMapping("/Cart/{id}")
	public List<CartItem> getCart(@PathVariable("id") Long id) {
		List<CartItem> items = cartService.getCartItemsbyUser(id);
		return items;
	}
	
	@PostMapping("/Cart")
	public ResponseEntity<CartItem> addCart(@RequestBody CartDTO  dto ) {
		CartItem item = productService.addItems(dto);
 if (item!=null) {
	 
	 return new ResponseEntity<CartItem>(item,HttpStatus.CREATED) ;
	 
} 
return null;
	}
	
	@DeleteMapping("/Cart/{id}")
	public  ResponseEntity<String> deleteCart(@PathVariable("id") Long id) {
		if (productService.deleteItem(id)) {
			 return new ResponseEntity<>("Cart Deleted Successfully" ,HttpStatus.OK) ;
			 
		} 
				return new ResponseEntity<>("Can't Delete ",HttpStatus.INTERNAL_SERVER_ERROR) ;
				}
	

	@DeleteMapping("/Cart")
	public ResponseEntity<String> DeleteAll() {
		productService.deleteAll();
 return new		ResponseEntity<>("Deleted All successFully",HttpStatus.OK);
	}
	
//	===============================================
	@GetMapping("/Order")
	public ResponseEntity<List<Orders>> getOrders() {
		return new ResponseEntity<List<Orders>>(orderService.getOrders(),HttpStatus.OK);
	}
	
	
	
}
