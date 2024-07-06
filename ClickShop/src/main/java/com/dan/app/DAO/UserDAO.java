package com.dan.app.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dan.app.model.User;

@Repository
public interface UserDAO  extends JpaRepository<User, Long>{

	boolean existsByEmailAndPassword(String email, String password);
	@Query(value = "call spring_db.get_UserID_by_email(:email)",nativeQuery = true)
	Long getUserIDbyEmail(String email);
	
}
