package com.ayssoft.yazilim_ots.business.abstracts;

import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.entities.UserSession;

import java.util.Date;
import java.util.List;

public interface IUserSessionService {
    void createSession(User user);

    void updateSessionOnLogout(User user);

    DataResult<List<UserSession>> getUserLoginAndLogout(int userId);
}

