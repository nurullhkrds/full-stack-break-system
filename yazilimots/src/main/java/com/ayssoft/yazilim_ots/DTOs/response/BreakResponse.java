package com.ayssoft.yazilim_ots.DTOs.response;

import com.ayssoft.yazilim_ots.entities.Break;
import com.ayssoft.yazilim_ots.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BreakResponse {

    int breakId;
    String breakType;
    LocalTime startTime;
    LocalTime endTime;
    int durationMinutes;
    User user;

    public BreakResponse(Break entity){
        this.breakType = entity.getBreakType().toString();
        this.startTime = entity.getStartTime();
        this.endTime = entity.getEndTime();
        this.durationMinutes = entity.getDurationMinutes();
        this.user = entity.getUser();
        this.breakId= entity.getId();
    }


}
