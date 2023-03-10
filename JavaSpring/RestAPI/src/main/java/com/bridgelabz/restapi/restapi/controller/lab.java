package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class lab {
    // This lab class will returns the report record of the user if their report
    // available in the database
    // If the report is not available then it will return the message that the
    // report is not available
    // This class will also add the report of the user in the database
    // This class will also delete the report of the user in the database
    // This class will also update the report of the user in the database
    // This class will also get the report of the user in the database
    // This class will also get the report of the user in the database by ID
    // This class will also get the report of the user in the database by Name

    /*
     * Add the New report in the Database
     */
    @PostMapping("/api/lab/addReport")
    public String addReport(@RequestBody String Report) {
        return "Report" + Report;
    }

    /*
     * Edit the Report in the Database
     */
    @PutMapping("/api/lab/editReport/{id}")
    public String editReport(@RequestBody String Report, @PathVariable int id) {
        return "Report" + id;
    }

    /*
     * Delete the Report from the Database
     */
    @DeleteMapping("/api/lab/deleteReport/{id}")
    public String deleteReport(@PathVariable int id) {
        return "Report" + id;
    }

    /*
     * Get the Report in the Database
     */
    @GetMapping("/api/lab/getReport")
    public String getReport() {
        return "Report";
    }

    /*
     * Get the Report in the Database by ID
     */
    @GetMapping("/api/lab/getReport/{id}")
    public String getReportById(@PathVariable String id) {
        return "Report" + id;
    }

    /*
     * Get the Report in the Database by Name
     */
    @GetMapping("/api/lab/getReport/{name}")
    public String getReportByName(@PathVariable String name) {
        return "Report" + name;
    }

    /*
     * Get the Report in the Database by Date
     */
    @GetMapping("/api/lab/getReport/{date}")
    public String getReportByDate(@PathVariable String date) {
        return "Report" + date;
    }

    /*
     * Get the Report in the Database by Time
     */
    @GetMapping("/api/lab/getReport/{time}")
    public String getReportByTime(@PathVariable String time) {
        return "Report" + time;
    }
}
