package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class lab {
    @GetMapping("/api/lab")
    public String Report() {
        return "Lab";
    }
}
