package com.dan.app.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dan.app.model.Address;

import jakarta.transaction.Transactional;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {
    List<Address> findByUser_id(UUID user_id);

    // JPQL
    @Modifying
    @Transactional
    @Query("""
                update Address a
                set a.isDefault = false
                where a.user.id = :userId
                  and a.id <> :addressId
            """)
    void clearOtherDefaults(UUID userId, UUID addressId);

}
