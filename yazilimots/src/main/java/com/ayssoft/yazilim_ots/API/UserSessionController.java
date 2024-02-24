package com.ayssoft.yazilim_ots.API;

import com.ayssoft.yazilim_ots.business.abstracts.IUserSessionService;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.entities.UserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/usersession")
public class UserSessionController {

    private final IUserSessionService userSessionService;

    @Autowired
    public UserSessionController(IUserSessionService userSessionService) {
        this.userSessionService = userSessionService;
    }


    @GetMapping("/userloginandlogout/{userId}")
    public DataResult<List<UserSession>> getUserLoginAndLogout(@PathVariable int userId){
        return userSessionService.getUserLoginAndLogout(userId);
    }





}
