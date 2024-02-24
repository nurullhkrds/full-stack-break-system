package com.ayssoft.yazilim_ots.business.concretes;

import com.ayssoft.yazilim_ots.DTOs.request.BreakRequest;
import com.ayssoft.yazilim_ots.DTOs.response.BreakResponse;
import com.ayssoft.yazilim_ots.DTOs.response.BreakStartResponse;
import com.ayssoft.yazilim_ots.business.abstracts.IBreakService;
import com.ayssoft.yazilim_ots.business.abstracts.IUserService;
import com.ayssoft.yazilim_ots.core.utilities.*;
import com.ayssoft.yazilim_ots.entities.Break;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.repository.IBreakRepository;
import com.ayssoft.yazilim_ots.repository.IUserRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BreakManager implements IBreakService {

    private final IBreakRepository breakRepository;
    private final IUserRepository userRepository;
    private final IUserService userService;
    public BreakManager(IBreakRepository breakRepository, IUserRepository userRepository, IUserService userService) {
        this.breakRepository = breakRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public DataResult<List<BreakResponse>> getAll() {
        List<Break> breaks =breakRepository.findAll() ;
        if (!breaks.isEmpty()){
            return new DataResult<>(true,"Tüm Molalar Listelendi",breaks.stream().map(BreakResponse::new).collect(Collectors.toList()));
        }
        return new ErrorDataResult<>("Molalar Bulunamadı",null);
    }

    @Override
    public DataResult<BreakResponse> getById(int id) {
        Break breakTest=breakRepository.findById(id).orElse(null);
        if (breakTest!=null){
            return new SuccesDataResult<>("Mola Listelendi",new BreakResponse(breakTest));
        }
        return new ErrorDataResult<>("Mola Bulunamadı",null) ;
    }

    @Override
    public DataResult<BreakStartResponse> startBreak(BreakRequest breakRequest) {
        Optional<User> userTest=userRepository.findById(breakRequest.getUserId());
        if (userTest.isPresent()){

            Break breakk=new Break();
            userService.isActive(userTest.get());
            breakk.setDurationMinutes(0);
            breakk.setEndTime(null);
            breakk.setStartTime(LocalTime.now());
            breakk.setBreakType(breakRequest.getType());
            breakk.setCreatedDate(new Date());
            breakk.setUser(userTest.get());
            breakRepository.save(breakk);
            return new SuccesDataResult<>("Mola Eklendi",new BreakStartResponse(breakk));
        }
        return new ErrorDataResult<>("Mola Eklenemedi ,Kullanıcı Bulunamadı",null);
    }

    public Result endBreak(int breakId) {
        Optional<Break> breakRecord = breakRepository.findById(breakId);
        Optional<User> userTest = userRepository.findById(breakRecord.get().getUser().getId());
        if (userTest.get().isBreak()){
            if (breakRecord.isPresent()) {
                Break breakk = breakRecord.get();
                userService.isNotActive(userTest.get());
                breakk.setEndTime(LocalTime.now());
                Duration duration = Duration.between(breakk.getStartTime(), breakk.getEndTime());
                breakk.setDurationMinutes((int) duration.toMinutes());
                breakRepository.save(breakk);
                return new SuccessResult("Mola başarıyla sonlandırıldı.");
            } else {
                return new ErrorResult("Mola kaydı bulunamadı.");
            }

        }else{
            return new ErrorResult("Kullanıcı zaten çalışıyor");
        }
    }


    @Override
    public DataResult<BreakResponse> getUserEndBy(int userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            Set<Break> breaks = breakRepository.findAllByUser(user);



            Optional<Break> lastBreak = breaks.stream()
                    .max(Comparator.comparing(Break::getId));

            if (lastBreak.isPresent()) {
                return new SuccesDataResult<>("Kullanıcının Molaları Listelendi", new BreakResponse(lastBreak.get()));
            }
        }

        return new ErrorDataResult<>("Kullanıcının molaları bulunamadı.", null);
    }

    @Override
    public DataResult<List<BreakResponse>> getActiveBreak() {

        return new SuccesDataResult<>("Aktif Molalar Listelendi", breakRepository.findBreaksWithNullEndTime().stream().map(BreakResponse::new).collect(Collectors.toList()));
    }


}