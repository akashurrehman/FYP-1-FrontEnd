package com.bridgelabz.restapi.restapi.controller;

import java.io.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.update.UpdateAction;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateRequest;
import org.json.JSONArray;
import org.json.JSONObject;
//import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

@RestController
public class Admin {

    /*
     * Manage the Sponsors in the Database
     * Add the Sponsor to the Database
     */
    @PostMapping("/api/admin/addSponsor")
    public String AddSponsorDetails() throws IOException {

        String name = "Ali Hassan";
        String message = "Sponser the details of the blood donation system";

        String individualId = "bd:Sponsor_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Sponsor ;\n" +
                        "                       bd:hasSponsorMessage \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasSponsorID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasSponsorName \"%s\"^^xsd:string ;\n" +
                        "}",
                message, individualId, name);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteSponsorDetails(String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Sponsor ;\n" +
                "                            bd:hasSponsorID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Sponsor in the Database
     */
    @GetMapping("/api/admin/getSponsor")
    public ResponseEntity<String> getSponsor() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?sponsors rdf:type bd:Sponsor ." +
                "?sponsors bd:hasSponsorID ?ID ." +
                "?sponsors bd:hasSponsorName ?Name ." +
                "?sponsors bd:hasSponsorMessage ?Message ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check that Result is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Data Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
    public String AddFinancialDonorDetails() throws IOException {

        String contactNo = "+92345687958";
        String message = "Donate the Financial Donation ";
        String name = "Salman Ahmed";
        String donationDate = "9th April, 2023";

        String individualId = "bd:Financial_Donor_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Financial_Donation ;\n" +
                        "                       bd:hasFinancialDonorContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFinancialDonorMessage \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFinancialDonorName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFinancialDonationID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFinancialDonorDonationDate \"%s\"^^xsd:string ;\n" +
                        "}",
                contactNo, message, name, individualId, donationDate);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    @DeleteMapping("/api/admin/deleteFinancialDonation/financialDonationDetails/delete/{id}")
    public String DeleteFinancialDonationDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Financial_Donation ;\n" +
                "                            bd:hasFinancialDonationID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Financial Donations in the Database
     */
    @GetMapping("/api/admin/getFinancialDonation")
    public ResponseEntity<String> getFinancialDonation() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?financial_donations rdf:type bd:Financial_Donation ." +
                "?financial_donations bd:hasFinancialDonorName ?Name ." +
                "?financial_donations bd:hasFinancialDonorContactNo ?ContactNo ." +
                "?financial_donations bd:hasFinancialDonorDonationDate ?Date ." +
                "?financial_donations bd:hasFinancialDonorDonationAmount ?Amount ." +
                "?financial_donations bd:hasFinancialDonorMessage ?Message ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check that Result is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Data Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get the Financial Donations in the Database by ID
     */
    @GetMapping("/api/admin/getFinancialDonation/{Name}")
    public ResponseEntity<String> getFinancialDonationByName(@PathVariable String Name) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?financial_donations rdf:type bd:Financial_Donation ." +
                "?financial_donations bd:hasFinancialDonorName ?Name ." +
                "?financial_donations bd:hasFinancialDonorContactNo ?ContactNo ." +
                "?financial_donations bd:hasFinancialDonorDonationDate ?Date ." +
                "?financial_donations bd:hasFinancialDonorDonationAmount ?Amount ." +
                "?financial_donations bd:hasFinancialDonorMessage ?Message ." +
                "filter(?Name = \"" + Name + "\")" +

                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Name: " + Name + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Manage the job Posts in the Database
     * Add the New Job posts
     */
    @PostMapping("/api/admin/addJobPost")
    public String AddJobPostDetails() throws IOException {

        String postingDate = "10 April, 2023";
        String title = "System Maintenance";
        String details = "Required the expert for the System maintance";

        String individualId = "bd:Job_Post_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Job_Post ;\n" +
                        "                       bd:hasJobPostID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasJobPostDetails \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasJobPostTitle \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasJobPostPostingDate \"%s\"^^xsd:string ;\n" +
                        "}",
                individualId, details, title, postingDate);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteJobPostDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Job_Post ;\n" +
                "                            bd:hasJobPostID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Job posts
     */
    @GetMapping("/api/admin/getJobPost")
    public ResponseEntity<String> getJobPost() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?jobs rdf:type bd:Job_Post ." +
                "?jobs bd:hasJobPostTitle ?Title ." +
                "?jobs bd:hasJobPostDetails ?Details ." +
                "?jobs bd:hasJobPostPostingDate ?Date " +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Record is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get the Job posts by ID
     */
    @GetMapping("/api/admin/getJobPost/{title}")
    public ResponseEntity<String> getJobPostById(@PathVariable String title) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?jobs rdf:type bd:Job_Post ." +
                "?jobs bd:hasJobPostTitle ?Title ." +
                "?jobs bd:hasJobPostDetails ?Details ." +
                "?jobs bd:hasJobPostPostingDate ?Date " +
                "filter(?Title = \"" + title + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using title: " + title + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Manage frequently asked Questions
     * Add the New Frequently Asked Questions
     */
    @PostMapping("/api/admin/addFAQ")
    public String AddFrequentlyAskedQuestionDetails() throws IOException {

        String title = "How to donate blood?";
        String details = "Here is the details about the blood donation";

        String individualId = "bd:FAQ_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Frequently_Asked_Question ;\n" +
                        "                       bd:hasFAQTitle \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFAQDetails \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasFAQID \"%s\"^^xsd:string ;\n" +
                        "}",
                title, details, individualId);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteFAQDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Frequently_Asked_Question ;\n" +
                "                            bd:hasFAQID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Frequently Asked Questions
     */
    @GetMapping("/api/admin/getFAQ")
    public ResponseEntity<String> getFAQ() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?faqs rdf:type bd:Frequently_Asked_Question ." +
                "?faqs bd:hasFAQTitle ?Title ." +
                "?faqs bd:hasFAQDetails ?Details ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Record is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get the Frequently Asked Questions by ID
     */
    @GetMapping("/api/admin/getFAQ/{title}")
    public ResponseEntity<String> getFAQById(@PathVariable String title) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?faqs rdf:type bd:Frequently_Asked_Question ." +
                "?faqs bd:hasFAQTitle ?Title ." +
                "?faqs bd:hasFAQDetails ?Details ." +
                "filter(?Title = " + title + ")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using title: " + title + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
    public String AddCampaignDetails() throws IOException {

        String title = "Campaign Title";
        String details = "Details about the Compaigns";
        String postDate = "9th April, 2023";

        String individualId = "bd:Campaign_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Campaign ;\n" +
                        "                       bd:hasCampaignTitle \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasCampaignDetails \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasCampaignID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasCampaignPostDate \"%s\"^^xsd:string ;\n" +
                        "}",
                title, details, individualId, postDate);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteCampaignDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Campaign ;\n" +
                "                            bd:hasCampaignID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Compaigns in the Database
     */
    @GetMapping("/api/admin/getCompaigns")
    public ResponseEntity<String> getCompaigns() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?campaigns rdf:type bd:Campaign ." +
                "?campaigns bd:hasCampaignTitle ?Title ." +
                "?campaigns bd:hasCampaignDetails ?Details ." +
                "?campaigns bd:hasCampaignsPostDate ?Date ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get the Compaign by ID
     */
    @GetMapping("/api/admin/getCompaigns/{title}")
    public ResponseEntity<String> getCompaignsById(@PathVariable String title) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?campaigns rdf:type bd:Campaign ." +
                "?campaigns bd:hasCampaignTitle ?Title ." +
                "?campaigns bd:hasCampaignDetails ?Details ." +
                "?campaigns bd:hasCampaignsPostDate ?Date ." +
                "filter(?Title = \"" + title + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Title: " + title + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Add the News in the Database
     */

    @PostMapping("/api/admin/addNews")
    public String AddNewsDetails() throws IOException {

        String postDate = "10th April, 2023";
        String title = "News Title";
        String details = "News Details";

        String individualId = "bd:News_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:News ;\n" +
                        "                       bd:hasNewsPostDate \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasNewsTitle \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasNewsDetails \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasNewsID \"%s\"^^xsd:string ;\n" +
                        "}",
                postDate, title, details, individualId);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteNewsDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:News ;\n" +
                "                            bd:hasNewsID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the News in the Database
     */
    @GetMapping("/api/admin/getNews")
    public ResponseEntity<String> getNews() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?news rdf:type bd:News ." +
                "?news bd:hasNewsTitle ?Title ." +
                "?news bd:hasNewsDetails ?Details ." +
                "?news bd:hasNewsPostDate ?Date" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);

    }

    /*
     * Get the News by title
     */
    @GetMapping("/api/admin/getNews/{title}")
    public ResponseEntity<String> getNewsById(@PathVariable String title) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?news rdf:type bd:News ." +
                "?news bd:hasNewsTitle ?Title ." +
                "?news bd:hasNewsDetails ?Details ." +
                "?news bd:hasNewsPostDate ?Date" +
                "filter(?Title = \"" + title + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using title: " + title + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Add the Events in the Database
     */
    @PostMapping("/api/admin/addEvents")
    public String AddEventDetails() throws IOException {

        String name = "Event Name";
        String location = "Main Street, Karachi";
        String message = "Event about Blood dONATION";
        String dateTime = "9th Feb, 2023";

        String individualId = "bd:Event_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Event ;\n" +
                        "                       bd:hasEventName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasEventID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasEventLocation \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasEventMessage \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasEventDateTime \"%s\"^^xsd:dateTime ;\n" +
                        "}",
                name, individualId, location, message, dateTime);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String DeleteEventDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Event ;\n" +
                "                            bd:hasEventID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    /*
     * Get the Events in the Database
     */
    @GetMapping("/api/admin/getEvents")
    public ResponseEntity<String> getEvents() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?events rdf:type bd:Events ." +
                "?events bd:hasEventsTitle ?Title ." +
                "?events bd:hasEventsDetails ?Details ." +
                "?events bd:hasEventsPostDate ?Date" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Record is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);

    }

    /*
     * Get the Events by title
     */
    @GetMapping("/api/admin/getEvents/{title}")
    public ResponseEntity<String> getEventsById(@PathVariable String title) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?events rdf:type bd:Events ." +
                "?events bd:hasEventsTitle ?Title ." +
                "?events bd:hasEventsDetails ?Details ." +
                "?events bd:hasEventsPostDate ?Date" +
                "filter(?Title = \"" + title + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if title is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Title: " + title + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    static void InsertSparql(String query) throws IOException {
        // create a file object for the RDF file
        File file = new File(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");

        // create a model from the RDF file
        Model model = ModelFactory.createDefaultModel();
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            model.read(in, null);
        } catch (IOException e) {
            System.out.println("No file Found!");
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // handle the exception
                }
            }
        }

        // Create the update execution object and execute the query
        UpdateAction.parseExecute(query, model);

        // Print the updated model
        System.out.println("Updated model:");

        // Write the updated model to a file
        FileOutputStream out = new FileOutputStream(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
        model.write(out, "RDF/XML-ABBREV");
        out.close();

    }

    static String ReadSparqlMethod(String queryString) {

        // create a file object for the RDF file
        File file = new File(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");

        //
        // create a model from the RDF file
        Model model = ModelFactory.createDefaultModel();
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            model.read(in, null);
        } catch (IOException e) {
            System.out.println("No file Found!");
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // handle the exception
                }
            }
        }
        Query query = QueryFactory.create(queryString);

        // execute the query and print the results
        try (QueryExecution qe = QueryExecutionFactory.create(query, model)) {
            ResultSet results = qe.execSelect();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ResultSetFormatter.outputAsJSON(outputStream, results);
            String jsonResult = outputStream.toString();
            return jsonResult;
            // Returns the results in json format
        }
    }

    /* Method for the Funtionality of Deleting data on the basis of query */
    static void DeleteSparql(String query) throws IOException {
        File file = new File(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");

        // create a model from the RDF file
        Model model = ModelFactory.createDefaultModel();
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            model.read(in, null);
        } catch (IOException e) {
            System.out.println("No file Found!");
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // handle the exception
                }
            }
        }

        // Create a UpdateRequest object
        UpdateRequest updateRequest = UpdateFactory.create(query);

        // Create a QueryExecution object and execute the query on the model
        UpdateAction.execute(updateRequest, model);
        // Write the updated model to a file
        FileOutputStream out = new FileOutputStream(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
        model.write(out, "RDF/XML-ABBREV");
        out.close();
    }

    /* Method for Funtionality of Updating Data using sparql query */
    static void UpdateSparql(String query) {

    }
}
