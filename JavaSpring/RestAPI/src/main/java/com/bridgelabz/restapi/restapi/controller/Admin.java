package com.bridgelabz.restapi.restapi.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Admin {

    /*
     * Manage the Sponsors in the Database
     * Add the Sponsor to the Database
     */
    @PostMapping("/api/admin/addSponsor")
    public String addSponsor(@RequestBody String Sponsor) {
        return "Sponsor" + Sponsor;
    }

    /*
     * Edit the Sponsor in the Database
     */
    @PutMapping("/api/admin/editSponsor/{id}")
    public String editSponsor(@RequestBody String Sponsor, @PathVariable int id) {
        return "Sponsor" + id;
    }

    /*
     * Delete the Sponsor in the Database
     */
    @DeleteMapping("/api/admin/deleteSponsor/{id}")
    public String deleteSponsor(@PathVariable int id) {
        return "Sponsor" + id;
    }

    /*
     * Get the Sponsor in the Database
     */
    @GetMapping("/api/admin/getSponsor")
    public String getSponsor() {
        return "Sponsor";
    }

    /*
     * Get the Sponsors in the Database by ID
     */
    @GetMapping("/api/admin/getSponsor/{id}")
    public String getSponsorById(@PathVariable String id) {
        return "Sponsor" + id;
    }

    /*
     * Manage the Financial Donation in the Database
     * Add the Financial Donation record
     */
    @PostMapping("/api/admin/addFinancialDonation")
    public String addFinancialDonation(@RequestBody String FinancialDonation) {
        return "FinancialDonation";
    }

    /*
     * Edit the Financial Donation Record By their ID
     */
    @PutMapping("/api/admin/editFinancialDonation/{id}")
    public String editFinancialDonation(@RequestBody String FinancialDonation, @PathVariable int id) {
        return "FinancialDonation" + id;
    }

    /*
     * Delete the Financial Donation Record By their ID
     */
    @DeleteMapping("/api/admin/deleteFinancialDonation/{id}")
    public String deleteFinancialDonation(@PathVariable int id) {
        return "FinancialDonation" + id;
    }

    /*
     * Get the Financial Donations in the Database
     */
    @GetMapping("/api/admin/getFinancialDonation")
    public String getFinancialDonation() {
        return "FinancialDonation";
    }

    /*
     * Get the Financial Donations in the Database by ID
     */
    @GetMapping("/api/admin/getFinancialDonation/{id}")
    public String getFinancialDonationById(@PathVariable String id) {
        return "FinancialDonation" + id;
    }

    /*
     * Manage the job Posts in the Database
     * Add the New Job posts
     */
    @PostMapping("/api/admin/addJobPost")
    public String addJobPost(@RequestBody String JobPost) {
        return "JobPost";
    }

    /*
     * Edit the Job posts
     */
    @PutMapping("/api/admin/editJobPost/{id}")
    public String editJobPost(@RequestBody String JobPost, @PathVariable int id) {
        return "JobPost" + id;
    }

    /*
     * Delete the Job posts
     */
    @DeleteMapping("/api/admin/deleteJobPost/{id}")
    public String deleteJobPost(@PathVariable int id) {
        return "JobPost" + id;
    }

    /*
     * Get the Job posts
     */
    @GetMapping("/api/admin/getJobPost")
    public String getJobPost() {
        return "JobPost";
    }

    /*
     * Get the Job posts by ID
     */
    @GetMapping("/api/admin/getJobPost/{id}")
    public String getJobPostById(@PathVariable String id) {
        return "JobPost" + id;
    }

    /*
     * Manage frequently asked Questions
     * Add the New Frequently Asked Questions
     */
    @PostMapping("/api/admin/addFAQ")
    public String addFAQ(@RequestBody String FAQ) {
        return "FAQ";
    }

    /*
     * Edit the Frequently Asked Questions by their ID
     */
    @PutMapping("/api/admin/editFAQ/{id}")
    public String editFAQ(@RequestBody String FAQ, @PathVariable int id) {
        return "FAQ" + id;
    }

    /*
     * Delete the Frequently Asked Questions by their ID
     */
    @DeleteMapping("/api/admin/deleteFAQ/{id}")
    public String deleteFAQ(@PathVariable int id) {
        return "FAQ" + id;
    }

    /*
     * Get the Frequently Asked Questions
     */
    @GetMapping("/api/admin/getFAQ")
    public String getFAQ() {
        return "FAQ";
    }

    /*
     * Get the Frequently Asked Questions by ID
     */
    @GetMapping("/api/admin/getFAQ/{id}")
    public String getFAQById(@PathVariable String id) {
        return "FAQ" + id;
    }

    /*
     * Manage the ENQUIRY in the Database
     * Add The Enquiry to the Database
     */
    @PostMapping("/api/admin/addEnquiry")
    public String addEnquiry(@RequestBody String Enquiry) {
        return "Enquiry";
    }

    /*
     * Edit the Enquiry in the Database
     */
    @PutMapping("/api/admin/editEnquiry/{id}")
    public String editEnquiry(@RequestBody String Enquiry, @PathVariable int id) {
        return "Enquiry" + id;
    }

    /*
     * Delete the Enquiry in the Database
     */
    @DeleteMapping("/api/admin/deleteEnquiry/{id}")
    public String deleteEnquiry(@PathVariable int id) {
        return "Enquiry" + id;
    }

    /*
     * Get the Enquiry in the Database
     */
    @GetMapping("/api/admin/getEnquiry")
    public String getEnquiry() {
        return "Enquiry";
    }

    /*
     * Get the Enquiry by ID
     */
    @GetMapping("/api/admin/getEnquiry/{id}")
    public String getEnquiryById(@PathVariable String id) {
        return "Enquiry" + id;
    }

    /*
     * Manage the Compaigns in the Database
     * Add the New Compaign to the Database
     */
    @PostMapping("/api/admin/addCompaigns")
    public String addCompaigns(@RequestBody String Compaigns) {
        return "Compaigns";
    }

    /*
     * Edit the Compaign in the Database
     */
    @PutMapping("/api/admin/editCompaigns/{id}")
    public String editCompaigns(@RequestBody String Compaigns, @PathVariable int id) {
        return "Compaigns" + id;
    }

    /*
     * Delete the Compaign by ID
     */
    @DeleteMapping("/api/admin/deleteCompaigns/{id}")
    public String deleteCompaigns(@PathVariable int id) {
        return "Compaigns" + id;
    }

    /*
     * Get the Compaigns in the Database
     */
    @GetMapping("/api/admin/getCompaigns")
    public String getCompaigns() {
        return "Compaigns";
    }

    /*
     * Get the Compaign by ID
     */
    @GetMapping("/api/admin/getCompaigns/{id}")
    public String getCompaignsById(@PathVariable String id) {
        return "Compaigns" + id;
    }

    /*
     * Add the News in the Database
     */

    @PostMapping("/api/admin/addNews")
    public String addNews(@RequestBody String News) {
        return "News";
    }

    /*
     * Edit the News in the Database
     */
    @PutMapping("/api/admin/editNews/{id}")
    public String editNews(@RequestBody String News, @PathVariable int id) {
        return "News" + id;
    }

    /*
     * Delete the News in the Database
     */
    @DeleteMapping("/api/admin/deleteNews/{id}")
    public String deleteNews(@PathVariable int id) {
        return "News" + id;
    }

    /*
     * Get the News in the Database
     */
    @GetMapping("/api/admin/getNews")
    public String getNews() {
        return "News";
    }

    /*
     * Get the News by ID
     */
    @GetMapping("/api/admin/getNews/{id}")
    public String getNewsById(@PathVariable String id) {
        return "News";
    }

    /*
     * Add the Events in the Database
     */
    @PostMapping("/api/admin/addEvents")
    public String addEvents(@RequestBody String Events) {
        return "Events" + Events;
    }

    /*
     * Edit the Events in the Database
     */
    @PutMapping("/api/admin/editEvents/{id}")
    public String editEvents(@PathVariable String id) {
        return "Events";
    }

    /*
     * Delete the Events in the Database
     */
    @DeleteMapping("/api/admin/deleteEvents/{id}")
    public String deleteEvents(@PathVariable String id) {
        return "Events";
    }
}
