package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class BloodCenter {
    @GetMapping("/api/bloodCenter")
    public String center() {
        return "Blood Donation Center";
    }

    @GetMapping("/api/blood")
    public String blood() {
        return "Blood Group: A+";
    }
}