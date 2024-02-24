package com.ayssoft.yazilim_ots.business.abstracts;

import com.ayssoft.yazilim_ots.DTOs.request.BreakRequest;
import com.ayssoft.yazilim_ots.DTOs.response.BreakResponse;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.core.utilities.Result;
import com.ayssoft.yazilim_ots.entities.Break;

import java.util.List;

public interface IBreakService {

    DataResult<List<BreakResponse>>getAll();

    DataResult<BreakResponse>getById(int id);

    Result startBreak(BreakRequest breakRequest);

    Result endBreak(int id);


    DataResult<BreakResponse> getUserEndBy(int userId);

    DataResult<List<BreakResponse>> getActiveBreak();
}
