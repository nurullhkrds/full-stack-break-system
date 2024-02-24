package com.ayssoft.yazilim_ots.business.concretes;

import com.ayssoft.yazilim_ots.business.abstracts.IUserSessionService;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.core.utilities.ErrorDataResult;
import com.ayssoft.yazilim_ots.core.utilities.SuccesDataResult;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.entities.UserSession;
import com.ayssoft.yazilim_ots.repository.IUserRepository;
import com.ayssoft.yazilim_ots.repository.IUserSessionRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class UserSessionManager implements IUserSessionService {

    private final IUserSessionRepository userSessionRepository;

    private final IUserRepository userRepository;

    public UserSessionManager(IUserSessionRepository userSessionRepository, IUserRepository userRepository) {
        this.userSessionRepository = userSessionRepository;
        this.userRepository = userRepository;
    }



    @Override
    public void createSession(User user) {
        UserSession userSession = new UserSession();
        userSession.setUser(user);
        userSession.setCreatedDate(new Date());
        userSession.setLoginTime(new Date());
        userSessionRepository.save(userSession);
    }

    @Override
    public void updateSessionOnLogout(User user) {
        UserSession lastSession = userSessionRepository.findTopByUserOrderByLoginTimeDesc(user);
        if (lastSession != null) {
            lastSession.setLogoutTime(new Date());
            userSessionRepository.save(lastSession);
        }
    }

    @Override
    public DataResult<List<UserSession>> getUserLoginAndLogout(int userId) {
        Optional<User> userTest = userRepository.findById(userId);
        if (userTest.isPresent()) {
            List<UserSession> userSessions = userSessionRepository.findByUserId(userId);
            return new SuccesDataResult<>("Kullanıcı Giriş ve Çıkışları Listelendi", userSessions);
        }
        return new ErrorDataResult<>("Kullanıcı Bulunamadı", null);
    }
}
