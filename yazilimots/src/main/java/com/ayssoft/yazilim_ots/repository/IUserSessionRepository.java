package com.ayssoft.yazilim_ots.repository;

import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.entities.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface IUserSessionRepository extends JpaRepository<UserSession , Integer> {
    UserSession findTopByUserOrderByLoginTimeDesc(User user);
    List<UserSession> findByUserId(Integer userId);


}
