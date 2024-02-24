package com.ayssoft.yazilim_ots.business.abstracts;

import com.ayssoft.yazilim_ots.DTOs.request.ChangePasswordUserRequest;
import com.ayssoft.yazilim_ots.DTOs.request.UpdateAvatarRequest;
import com.ayssoft.yazilim_ots.DTOs.response.ChangePasswordResponse;
import com.ayssoft.yazilim_ots.DTOs.response.UserResponse;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.entities.User;

import java.time.Duration;
import java.util.Date;
import java.util.List;

public interface IUserService {
    DataResult<List<UserResponse>> getAll();
    DataResult<UserResponse> getById(int id);
    DataResult<UserResponse> getByEmail(String email);

    DataResult<UserResponse> updateUserAvatar(int userId, UpdateAvatarRequest userUpdateRequest);

    void isActive(User user);
     void isNotActive(User user);
    void saveLoginTime(User user);
    void saveLogoutTime(User user);
    Duration calculateWorkHours(int userId, Date date);

    ChangePasswordResponse updateOneUser(int userId, ChangePasswordUserRequest changePasswordUserRequest);

}
