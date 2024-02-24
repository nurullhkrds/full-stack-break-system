package com.ayssoft.yazilim_ots.API;

import com.ayssoft.yazilim_ots.auth.AuthenticationRequest;
import com.ayssoft.yazilim_ots.auth.AuthenticationResponse;
import com.ayssoft.yazilim_ots.auth.AuthenticationService;
import com.ayssoft.yazilim_ots.auth.RegisterRequest;
import com.ayssoft.yazilim_ots.business.abstracts.IUserSessionService;
import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.repository.IUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/auth")
public class AuthControllers {

    private final AuthenticationService authenticationService;
    private final IUserRepository userRepository;
    private final IUserSessionService userSessionService;

    public AuthControllers(AuthenticationService authenticationService, IUserRepository userRepository, IUserSessionService userSessionService) {
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
        this.userSessionService = userSessionService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        AuthenticationResponse authResponse = authenticationService.authenticate(request);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + request.getEmail()));
        if (user!=null){
            userSessionService.createSession(user);
            user.setIsLogin(true);
            userRepository.save(user);

        }

        return ResponseEntity.ok(authResponse);
    }
    @GetMapping("/perform-logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            UserDetails userDetails = (UserDetails) auth.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + userDetails.getUsername()));
            userSessionService.updateSessionOnLogout(user);
            user.setIsLogin(false);
            userRepository.save(user);


            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "çıkış yapıldı";
    }

}