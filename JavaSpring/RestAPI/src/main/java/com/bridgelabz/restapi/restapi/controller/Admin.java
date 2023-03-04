package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Admin {
    @GetMapping("/api/admin")
    public String admin() {
        return "Admin";
    }
}
