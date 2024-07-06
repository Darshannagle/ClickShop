package com.dan.app.service;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dan.app.DAO.CartDAO;
import com.dan.app.DAO.OrderDAO;
import com.dan.app.DAO.ProductDAO;
import com.dan.app.DAO.UserDAO;
import com.dan.app.DTO.OrderDTO;
import com.dan.app.model.CartItem;
import com.dan.app.model.Orders;
import com.dan.app.model.Product;
import com.dan.app.model.User;

@Service
public class OrderService {

	@Autowired
	private OrderDAO orderDAO;
	
	@Autowired
	private ProductDAO productDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	

	public List<Orders> getOrders() {
		return orderDAO.findAll();
	}
	
	public List<Orders> getOrdersByUserId(Long userid) {
		List<Orders> orders = orderDAO.findByUser(userid);
		return orders;
	}
	

	public Orders placeOrder(OrderDTO orderDTO) {
		
		Product product = productDAO.findById(orderDTO.getProduct_id()).get();
		Orders orders = new Orders();
		orders.setProduct(product);
		User user = userDAO.findById(orderDTO.getUser_id()).get();
		orders.setUser(user);
		orders.setTotal(orderDTO.getTotal());
		orders.setQuantity(orderDTO.getQuantity());
		orders.setDatetime(new Date());
		orders = orderDAO.save(orders);
		return orders;
	}
	
//	public ResponseEntity<List<Orders>> saveOrders(List<Orders> orders) {
//
//		for (Orders o : orders) {
//			orderDAO.save(o);
//		}
//		 	
//		return new ResponseEntity<List<Orders>>(orders,HttpStatus.CREATED);
//	}

	
	public Orders deleteOrders(Long id) {
		if (orderDAO.existsById(id)) {
			System.out.println("exists");
Orders orders = orderDAO.findById(id).get();
System.out.println("order - cart :"+orders.getProduct().getProduct_id());
			orderDAO.deleteById(id);
			return orders;
		} else {
				return null;
		}
		
		
	}
}
