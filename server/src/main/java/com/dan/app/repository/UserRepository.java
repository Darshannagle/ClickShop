package com.dan.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.dan.app.model.User;
import com.dan.app.config.types.User.UserType.userListData;;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Query(value = "SELECT id,email,full_name,gender,location,phone,pin_code FROM users", nativeQuery = true)
    List<userListData> list();

    // find by email
    Optional<User> findByEmail(String email);

    // if user exist with given mail
    boolean existsByEmail(String email);

}
