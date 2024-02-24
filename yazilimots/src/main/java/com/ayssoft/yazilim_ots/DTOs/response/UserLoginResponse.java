package com.ayssoft.yazilim_ots.DTOs.response;

import lombok.Data;

@Data
public class UserLoginResponse {
    int userId;
    String email;
    String firstname;
    String lastname;
    String token;
}
