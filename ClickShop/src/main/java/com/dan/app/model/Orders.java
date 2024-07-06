package com.dan.app.model;




import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.ManyToAny;
import org.hibernate.id.UUIDGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
@Entity
@Data
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long order_id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "product_id" , referencedColumnName = "product_id" )
	private Product product;
	private int quantity;
	private String status="placed";
	private Date datetime;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id",referencedColumnName = "user_id" )
	private User user;
	
	private Long total;

	


	public Orders() {
	}

}
