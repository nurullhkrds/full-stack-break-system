package com.ayssoft.yazilim_ots.DTOs.response;

import lombok.Data;

import java.util.Date;

@Data
public class BreakListResponse {

    int id;
    String breakType;
    Date createdDate;
    int durationMinutes;



}
