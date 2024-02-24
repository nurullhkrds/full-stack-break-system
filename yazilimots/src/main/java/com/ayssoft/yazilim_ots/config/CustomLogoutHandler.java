package com.ayssoft.yazilim_ots.config;

import com.ayssoft.yazilim_ots.entities.User;
import com.ayssoft.yazilim_ots.repository.IUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import java.io.IOException;
import java.util.Date;

@Component
public class CustomLogoutHandler implements LogoutHandler {


    private final IUserRepository userRepository;
    private final BlacklistService blacklistService;


    public CustomLogoutHandler(IUserRepository userRepository, BlacklistService blacklistService) {
        this.userRepository = userRepository;
        this.blacklistService = blacklistService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null) {
            SecurityContextHolder.clearContext();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + userDetails.getUsername()));

            user.setLogoutTime(new Date());
            userRepository.save(user);
            String token = extractTokenFromRequest(request);
            blacklistService.addToBlacklist(token);


            try {
                response.sendRedirect("/login?logout");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }


}