package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class BloodCenter {

    /* Route to Get Data of all blood Donation Centers */
    @GetMapping("/api/bloodCenter/RegisteredCenters")
    public String center() {
        return "All Blood Donation Center";
    }

    /* Route to Get Data of Single blood Donation Center by passing ID */
    @GetMapping("/api/bloodCenter/RegisteredCenters/{id}")
    public String centers(@PathVariable String id) {
        return "Blood Donation Center: " + id;
    }

    /* Route to add New Blood Donation Center */
    @PostMapping("/api/bloodCenter/RegisteredCenters")
    public String centerPost(@RequestBody String center) {
        return "Blood Donation Center: " + center;
    }

    /*
     * Route to Edit the Blood
     * ID is passed in the URL
     * Through ID we can find the Blood Donation Center
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/{id}")
    public String centerPut(@RequestBody String center, @PathVariable String id) {
        return "Blood Donation Center: " + id;
    }

    /**
     * Add User Information who donate blood
     * FR-14
     * Information Includes blood details and user details
     */
    @PostMapping("/api/bloodCenter/RegisteredCenters/addUserInfo")
    public String addUserInfo(@RequestBody String userInfo) {
        return "User Information: " + userInfo;
    }

    /**
     * Delete User Information who donate blood
     * Information Includes blood details and user details
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/deleteUserInfo")
    public String deleteUserInfo(@RequestBody String userInfo) {
        return "User Information: " + userInfo;
    }

    /*
     * Edit User Information who donate blood
     * Information Includes blood details and user details
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/editUserInfo/{id}")
    public String editUserInfo(@RequestBody String userInfo, @PathVariable String id) {
        return "User Information: " + userInfo + " ID: " + id;
    }

    /*
     * Get User Information who donate blood
     * By specific id
     * Information Includes blood details and user details
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getUserInfo/{id}")
    public String getUserInfo(@PathVariable String id) {
        return "User Information: " + id;
    }

    /*
     * Get User Information who donate blood
     * Information Includes blood details and user details
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getUserInfo")
    public String getUserInfo() {
        return "User Information: ";
    }

    /*
     * Get Blood Stock Details of blood Donation Centres
     * Information Includes Last date preserved and quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails")
    public String GetbloodStockDetails() {
        return "Blood Stock Details";
    }

    /*
     * Blood Stock Details of blood Donation Centres by passing ID
     * Information Includes Last daate preserved and quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{id}")
    public String GetbloodStockDetailsbyID(@PathVariable String id) {
        return "Blood Stock Details: " + id;
    }

    /*
     * Add Blood Stock Details of blood Donation Centres
     * Information Includes Last daate preserved and quantity
     */
    @PostMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails")
    public String AddbloodStockDetails(@RequestBody String bloodStockDetails) {
        return "Blood Stock Details: " + bloodStockDetails;
    }

    /*
     * Edit Blood Stock Details of blood Donation Centres by passing id
     * Information Includes Last daate preserved and quantity
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{id}")
    public String EditbloodStockDetails(@RequestBody String bloodStockDetails, @PathVariable String id) {
        return "Blood Stock Details: " + bloodStockDetails + " ID: " + id;
    }

    /*
     * Delete Blood Stock Details of blood Donation Centres by passing id
     * Information Includes Last daate preserved and quantity
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{id}")
    public String DeletebloodStockDetails(@PathVariable String id) {
        return "Blood Stock Details: " + id;
    }

    /*
     * Make the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @PostMapping("/api/bloodCenter/RegisteredCenters/makeRequest")
    public String makeRequest(@RequestBody String request) {
        return "Request: " + request;
    }

    /*
     * Edit the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/editRequest/{id}")
    public String editRequest(@RequestBody String request, @PathVariable String id) {
        return "Request: " + request + " ID: " + id;
    }

    /*
     * Delete the Request for Blood by id
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/deleteRequest/{id}")
    public String deleteRequest(@PathVariable String id) {
        return "Request: " + id;
    }

    /*
     * Get the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getRequest")
    public String getRequest() {
        return "All Requests: ";
    }

    /*
     * Get the Request for Blood by passing ID
     * 
     * @param requestID
     * 
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getRequest/{id}")
    public String getRequest(@PathVariable String id) {
        return "Request: " + id;
    }
}