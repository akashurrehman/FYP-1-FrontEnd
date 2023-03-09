package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class BloodCenter {
    @GetMapping("/api/bloodCenter")
    public String center() {
        return "Blood Donation Center";
    }

    @GetMapping("/api/bloodCenter")
    public String blood() {
        return "Blood Group: A+";
    }

    @DeleteMapping("/api/bloodCenter/{id}")
    public String center(@RequestBody String id) {
        return "Delete Route";
    }

    @PostMapping("/api/bloodCenter")
    public String bloodPost(@RequestBody String blood) {
        return "Blood Group: A+";
    }
}