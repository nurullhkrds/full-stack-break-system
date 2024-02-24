package com.ayssoft.yazilim_ots.DTOs.response;

import com.ayssoft.yazilim_ots.entities.Break;
import lombok.Data;

@Data
public class BreakStartResponse {

    int id;
    String breakType;

    public BreakStartResponse(Break entity){
        this.id = entity.getId();
        this.breakType = entity.getBreakType();
    }



}
