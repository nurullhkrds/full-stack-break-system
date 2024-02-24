package com.ayssoft.yazilim_ots.config;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BlacklistService {
    private Set<String> tokenBlacklist = new HashSet<>();


    public void addToBlacklist(String token) {
        tokenBlacklist.add(token);
    }

    public boolean isBlacklisted(String token) {
        return tokenBlacklist.contains(token);
    }
}
