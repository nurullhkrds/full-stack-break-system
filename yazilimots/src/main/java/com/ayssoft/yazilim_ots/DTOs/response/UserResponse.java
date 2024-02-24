package com.ayssoft.yazilim_ots.DTOs.response;

import com.ayssoft.yazilim_ots.entities.Break;
import com.ayssoft.yazilim_ots.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.module.Configuration;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    int id;
    String firstname;
    String lastname;
    String email;
    String role;
    Boolean isBreak;
    Date loginTime;
    Set<Break> breakList;
    int avatar;

    public UserResponse(User entity, Set<Break> breakList){
        this.id = entity.getId();
        this.firstname = entity.getFirstname();
        this.lastname = entity.getLastname();
        this.email = entity.getEmail();
        this.role = entity.getRole().name();
        this.isBreak = entity.isBreak();
        this.breakList = breakList;
        this.avatar= entity.getAvatar();
        this.loginTime = entity.getLoginTime();
    }
    public UserResponse(User entity){
        this.id = entity.getId();
        this.firstname = entity.getFirstname();
        this.lastname = entity.getLastname();
        this.email = entity.getEmail();
        this.role = entity.getRole().name();
        this.isBreak = entity.isBreak();
        this.breakList = entity.getBreaks();
        this.avatar= entity.getAvatar();
        this.loginTime = entity.getLoginTime();
    }

}
