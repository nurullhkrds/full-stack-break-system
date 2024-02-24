package com.ayssoft.yazilim_ots.API;

import com.ayssoft.yazilim_ots.DTOs.request.BreakRequest;
import com.ayssoft.yazilim_ots.DTOs.response.BreakResponse;
import com.ayssoft.yazilim_ots.business.abstracts.IBreakService;
import com.ayssoft.yazilim_ots.core.utilities.DataResult;
import com.ayssoft.yazilim_ots.core.utilities.Result;
import com.ayssoft.yazilim_ots.core.utilities.SuccessResult;
import com.ayssoft.yazilim_ots.entities.Break;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/break")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class BreakControllers {


    private final IBreakService breakService;

    public BreakControllers(IBreakService breakService) {
        this.breakService = breakService;
    }

    @GetMapping("/getAll")
    public DataResult<List<BreakResponse>> getAll(){
        return breakService.getAll();
    }


    @GetMapping("/getuserendby/{userId}")
    public DataResult<BreakResponse>getUserEndBy(@PathVariable int userId){
        return breakService.getUserEndBy(userId);
    }


    @GetMapping("/activebreak")
    public DataResult<List<BreakResponse>> getActiveBreak(){
        return breakService.getActiveBreak();
    }

    @PostMapping("/add")
    public Result add(@RequestBody BreakRequest breakRequest){
        return breakService.startBreak(breakRequest);
    }

    @PostMapping("/delete/{id}")
    public Result delete(@PathVariable int id){
        return breakService.endBreak(id);
    }






}
