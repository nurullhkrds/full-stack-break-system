package com.ayssoft.yazilim_ots.API;

import com.ayssoft.yazilim_ots.DTOs.request.ChangePasswordUserRequest;
import com.ayssoft.yazilim_ots.DTOs.request.UpdateAvatarRequest;
import com.ayssoft.yazilim_ots.DTOs.response.ChangePasswordResponse;
import com.ayssoft.yazilim_ots.DTOs.response.UserResponse;
import com.ayssoft.yazilim_ots.business.abstracts.IUserService;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.entities.User;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class UsersControllers {
    private final IUserService userService;


    public UsersControllers(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getall")
    public DataResult<List<UserResponse>> getAll() {
        return this.userService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
    @GetMapping("/getbyid/{userId}")
    public DataResult<UserResponse> getById(@PathVariable int userId) {
        return this.userService.getById(userId);
    }

    @GetMapping("getbyemail/{email}")
    public DataResult<UserResponse> getByEmail(@PathVariable String email) {
        return this.userService.getByEmail(email);
    }


    @PutMapping("/{userId}")
    public DataResult<UserResponse> updateAvatarUser(@PathVariable int userId, @RequestBody UpdateAvatarRequest userUpdateRequest){
        return userService.updateUserAvatar(userId,userUpdateRequest);

    }

    @PutMapping("/changepassword/{userId}")
    public ChangePasswordResponse updateOneUser(@PathVariable int userId, @RequestBody ChangePasswordUserRequest changePasswordUserRequest){
        return userService.updateOneUser(userId,changePasswordUserRequest);
    }

    @GetMapping("/calculateWorkHours/{userId}")
    public ResponseEntity<?> calculateWorkHours(
            @PathVariable int userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        try {
            Duration workHours = userService.calculateWorkHours(userId, date);
            long hours = workHours.toHours();
            long minutes = workHours.minusHours(hours).toMinutes();
            String workHoursString = String.format("%d hours and %d minutes", hours, minutes);
            return ResponseEntity.ok(workHoursString);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error calculating work hours: " + e.getMessage());
        }
    }
}