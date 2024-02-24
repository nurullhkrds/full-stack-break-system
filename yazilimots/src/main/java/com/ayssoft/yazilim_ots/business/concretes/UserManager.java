package com.ayssoft.yazilim_ots.business.concretes;

import com.ayssoft.yazilim_ots.DTOs.request.ChangePasswordUserRequest;
import com.ayssoft.yazilim_ots.DTOs.request.UpdateAvatarRequest;
import com.ayssoft.yazilim_ots.DTOs.response.ChangePasswordResponse;
import com.ayssoft.yazilim_ots.DTOs.response.UserResponse;
import com.ayssoft.yazilim_ots.business.abstracts.IUserService;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.core.utilities.ErrorDataResult;
import com.ayssoft.yazilim_ots.core.utilities.SuccesDataResult;
import com.ayssoft.yazilim_ots.entities.Break;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.repository.IBreakRepository;
import com.ayssoft.yazilim_ots.repository.IUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserManager implements IUserService{

    private final IUserRepository userRepository;
    private final IBreakRepository breakRepository;
    public UserManager(IUserRepository userRepository, IBreakRepository breakRepository) {
        this.userRepository = userRepository;
        this.breakRepository = breakRepository;
    }


    @Override
    public DataResult<List<UserResponse>> getAll() {
        List<User> userList = userRepository.findAll();

        if (!userList.isEmpty()) {
            List<UserResponse> userResponses = userList.stream()
                    .map(user -> {
                        Set<Break> breakList = breakRepository.findAllByUser(user);
                        return new UserResponse(user, breakList);
                    })
                    .collect(Collectors.toList());

            return new SuccesDataResult<>("Kullanıcılar getirildi", userResponses);
        }

        return new ErrorDataResult<>("Kullanıcı bulunamadı", null);
    }


    @Override
    public DataResult<UserResponse> getById(int id) {
        Optional<User> userTest=userRepository.findById(id);
        Set<Break> breakList = breakRepository.findAllByUser(userTest.get());


        if (userTest.isPresent()){
            return new SuccesDataResult<>("Kullanıcı getirildi",new UserResponse(userTest.get(),breakList));
        }

        return new ErrorDataResult<>("Böyle bir kullanıcı yok",null);
    }


    @Override
    public DataResult<UserResponse> updateUserAvatar(int userId, UpdateAvatarRequest userUpdateRequest) {
        Optional<User> userTest = userRepository.findById(userId);
        if (userTest.isPresent()) {
            User userToUpdate=userTest.get();
            userToUpdate.setAvatar(userUpdateRequest.getAvatar());
            userRepository.save(userToUpdate);
            return new SuccesDataResult<UserResponse>("Güncellendi",new UserResponse(userToUpdate));

        }
        return new ErrorDataResult<>("Güncellenemedi...!",null);
    }

    @Override
    public DataResult<UserResponse> getByEmail(String email) {
        Optional<User> userTest=userRepository.findByEmail(email);
        if (userTest.isPresent()){
            return new SuccesDataResult<>("Kullanıcı getirildi",new UserResponse(userTest.get()));
        }


        return new ErrorDataResult<>("Böyle bir kullanıcı yok",null);
    }



    @Override
    public ChangePasswordResponse updateOneUser(int userId, ChangePasswordUserRequest changePasswordUserRequest) {
        ChangePasswordResponse message=new ChangePasswordResponse();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String oldPassword=userRepository.findById(userId).get().getPassword();
        User userToUpdate=userRepository.findById(userId).get();
        boolean  isPasswordMatch = passwordEncoder.matches(changePasswordUserRequest.getOldPassword(), oldPassword);

        if(isPasswordMatch==true){
            User user=userToUpdate;
            user.setPassword(passwordEncoder.encode(changePasswordUserRequest.getNewPassword()));
            userRepository.save(userToUpdate);
            message.setMessage("Şifre Başarıyla Değiştirildi...");
            return message;


        }else{
            message.setMessage("Mevcut şifre yanlış !");
            return message;

        }
    }






    public void isActive(User user){

        user.setBreak(true);
        userRepository.save(user);
    }

    public void isNotActive(User user){
        user.setBreak(false);
        userRepository.save(user);
    }

    public void saveLoginTime(User user) {
        User userLog = user;
        userLog.setLoginTime(new Date());
        userRepository.save(userLog);
    }

    public void saveLogoutTime(User user) {
        User userLog = user;
        if (userLog != null) {
            userLog.setLogoutTime(new Date());
            userRepository.save(userLog);
        }
    }
    public LocalTime convertToLocalTime(Date date) {
        Instant instant = date.toInstant();
        LocalTime localTime = instant.atZone(ZoneId.systemDefault()).toLocalTime();
        return localTime;
    }
    public Duration calculateWorkHours(int userId, Date date) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return Duration.ZERO;
        }
        User user = userOpt.get();
        LocalDateTime startOfDay = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime()
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        List<Break> breaks = breakRepository.findAllByUserIdAndStartTimeBetween(userId, startOfDay, endOfDay);
        Duration totalBreakDuration = breaks.stream()
                .map(b -> Duration.between(b.getStartTime(), b.getEndTime()))
                .reduce(Duration.ZERO, Duration::plus);
        LocalTime loginTime = convertToLocalTime(user.getLoginTime());
        LocalTime logoutTime = convertToLocalTime(user.getLogoutTime());
        Duration workDuration = Duration.between(loginTime, logoutTime);
        return workDuration.minus(totalBreakDuration);
    }


    private Set<Break> getBreaksForUser(User user) {
        // Assuming getBreaks() returns the breaks associated with the user
        Set<Break> breaks = user.getBreaks();

        // Handle null or empty breaks
        return breaks != null ? breaks : Collections.emptySet();
    }
}