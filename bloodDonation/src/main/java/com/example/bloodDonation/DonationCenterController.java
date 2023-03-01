package com.example.bloodDonation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class DonationCenterController {

    /**
     * @return
     */
    @GetMapping()
    public ResponseEntity<String> getAll() {
        return new ResponseEntity<String>("Hello World", HttpStatus.OK);
    }
}
