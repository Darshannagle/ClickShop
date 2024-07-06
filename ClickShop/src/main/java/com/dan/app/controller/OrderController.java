package com.dan.app.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.dan.app.DAO.CartDAO;
import com.dan.app.DAO.OrderDAO;
import com.dan.app.DAO.ProductDAO;
import com.dan.app.DAO.UserDAO;
import com.dan.app.DTO.CartDTO;
import com.dan.app.DTO.OrderDTO;
import com.dan.app.model.CartItem;
import com.dan.app.model.Orders;
import com.dan.app.model.Product;
import com.dan.app.model.User;
import com.dan.app.service.CartService;
import com.dan.app.service.OrderService;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderDAO orderDAO;
	
	@Autowired
	private ProductDAO productDAO;
	@Autowired
	private UserDAO userDAO;
		
	@GetMapping("/Order/{userid}")
	public List<Orders> getOrders(@PathVariable Long userid) {
		
		List<Orders> orders= orderDAO.findByUser(userid);
		return orders;
	}
	@PostMapping("/Order")
	public ResponseEntity<List<Orders>> saveOrders(@RequestBody List<OrderDTO> items) {
		System.out.println("in method "); 
		Long user_id = 0L;
		List<Long> orderlist = new ArrayList<>();
		for (OrderDTO dto : items) {
			System.out.println("product id : "+dto.getProduct_id());
			user_id = dto.getUser_id();
			Optional<Product> prOptional= productDAO.findById(dto.getProduct_id());
			if (prOptional.isPresent()) {
				System.out.println("not null :"+dto.getProduct_id());
//				Product product = productDAO.findById(dto.getProduct_id()).get();
//				product.setStock((product.getStock()-dto.getQuantity()));
//		    productDAO.save(product);

				Orders order = new Orders();
				order.setUser(userDAO.findById(user_id).get());
				order.setQuantity(dto.getQuantity());
				order.setProduct(prOptional.get());
				order.setTotal(dto.getTotal());
				order.setDatetime(new Date());
				order =  orderDAO.save(order);
				orderlist.add(order.getOrder_id());
			}
			else {
				System.out.println("item not present : "+dto.getProduct_id());
			}
		}
		System.out.println(orderlist);
		List<Orders> orders = orderDAO.findByUser(user_id);
		return new ResponseEntity<List<Orders>>(orders,HttpStatus.OK) ;
		
		
//		ResponseEntity<List<Orders>> o = orderService.getOrdersByUserId();
//		return o;
	}
	
	@DeleteMapping("/Order/delete:{id}")
	public ResponseEntity<Orders> deleteOrders(@PathVariable Long id) {
		Orders orders = orderService.deleteOrders(id);
		if (orders!=null) {
			return new ResponseEntity<Orders>(orders,HttpStatus.OK);
		} else {
			return new ResponseEntity<Orders>(orders,HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	
	
	
	
}

