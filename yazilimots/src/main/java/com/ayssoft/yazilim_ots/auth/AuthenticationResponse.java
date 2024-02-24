package com.ayssoft.yazilim_ots.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private int userId;
    private String email;
    private String firstname;
    private String lastname;
    private String token;
    private int avatar;
}
