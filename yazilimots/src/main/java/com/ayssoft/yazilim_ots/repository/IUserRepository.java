package com.ayssoft.yazilim_ots.repository;

import com.ayssoft.yazilim_ots.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer>{

    List<User> findAll();

    Optional<User> findByEmail(String email);
}