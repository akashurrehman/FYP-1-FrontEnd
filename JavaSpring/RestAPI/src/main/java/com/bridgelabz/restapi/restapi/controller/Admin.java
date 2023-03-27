package com.bridgelabz.restapi.restapi.controller;

import java.io.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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
     * Managed by Akash Ur Rehman
     * Last Updated on 24/03/2020 11:00 PM
     * All Routes are added for FRs
     * No Hard Coded Data
     * Pass Data in Json format for POST AND PUT Requests
     */

    /*
     * Manage the Sponsors in the Database
     * Add the Sponsor to the Database
     */
    @PostMapping("/api/admin/addSponsor")
    public String AddSponsorDetails(@RequestBody String Sponser) throws IOException {
        /*
         * String name = "Ali Hassan";
         * String message = "Sponser the details of the blood donation system";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(Sponser);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;

        String individualId = "Sponsor_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Sponsor ;\n" +
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

    /*
     * Method to update Sponsor
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/sponsor/SponsorDetails/update/{ID}")
    public String UpdateSponsorDetails(@PathVariable String ID, @RequestBody String sponsor)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(sponsor);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?sponsor bd:hasSponsorName ?Name ." +
                "?sponsor bd:hasSponsorMessage ?Message ." +
                "INSERT { ?sponsor bd:hasSponsorName \"" + name + "\"^^xsd:string ." +
                " ?sponsor bd:hasSponsorMessage \"" + message + "\"^^xsd:string ." +
                "WHERE { ?sponsor rdf:type bd:Sponsor ." +
                "?sponsor bd:hasSponsorMessage ?Message ." +
                "?sponsor bd:hasSponsorName ?Name ." +
                "?sponsor bd:hasSponsorID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Sponsor runs successfully " + ID;
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
    public String AddFinancialDonorDetails(@BodyRequest String FinancialDonation) throws IOException {
        /*
         * String contactNo = "+92345687958";
         * String message = "Donate the Financial Donation ";
         * String name = "Salman Ahmed";
         * String donationDate = "9th April, 2023";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(FinancialDonation);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String donationDate = jsonNode.has("donationDate") ? jsonNode.get("donationDate").asText() : null;

        String individualId = "Financial_Donor_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Financial_Donation ;\n" +
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
    /*
     * Method to update Financial Donation
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/financialDonation/financialDonationDetails/update/{ID}")
    public String UpdateFinancialDonationDetails(@PathVariable String ID, @RequestBody String financialDonation)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(financialDonation);

        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String donationAmount = jsonNode.has("donationAmount") ? jsonNode.get("donationAmount").asText() : null;
        String donationDate = jsonNode.has("donationDate") ? jsonNode.get("donationDate").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?financialDonor bd:hasFinancialDonorContactNo ?ContactNo ." +
                "?financialDonor bd:hasFinancialDonorMessage ?Message ." +
                "?financialDonor bd:hasFinancialDonorName ?Name ." +
                "?financialDonor bd:hasFinancialDonorDonationAmount ?DonationAmount ." +
                "?financialDonor bd:hasFinancialDonorDonationDate ?DonationDate ." +
                "INSERT { ?financialDonor bd:hasFinancialDonorContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?financialDonor bd:hasFinancialDonorMessage \"" + message + "\"^^xsd:string ." +
                " ?financialDonor bd:hasFinancialDonorName \"" + name + "\"^^xsd:string ." +
                " ?financialDonor bd:hasFinancialDonorDonationAmount \"" + donationAmount + "\"^^xsd:string ." +
                " ?financialDonor bd:hasFinancialDonorDonationDate \"" + donationDate + "\"^^xsd:string ." +
                "WHERE { ?financialDonor rdf:type bd:Financial_Donation ." +
                "?financialDonor bd:hasFinancialDonorContactNo ?ContactNo ." +
                "?financialDonor bd:hasFinancialDonorDonationAmount ?DonationAmount ." +
                "?financialDonor bd:hasFinancialDonorMessage ?Message ." +
                "?financialDonor bd:hasFinancialDonorName ?Name ." +
                "?financialDonor bd:hasFinancialDonorDonationDate ?DonationDate ." +
                "?financialDonor bd:hasFinancialDonationID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Financial Donation runs successfully " + ID;
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
                "?financial_donations bd:hasFinancialDonationID ?ID ." +
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
    @GetMapping("/api/admin/getFinancialDonation/{ID}")
    public ResponseEntity<String> getFinancialDonationByName(@PathVariable String ID) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?financial_donations rdf:type bd:Financial_Donation ." +
                "?financial_donations bd:hasFinancialDonationID ?ID ." +
                "?financial_donations bd:hasFinancialDonorName ?Name ." +
                "?financial_donations bd:hasFinancialDonorContactNo ?ContactNo ." +
                "?financial_donations bd:hasFinancialDonorDonationDate ?Date ." +
                "?financial_donations bd:hasFinancialDonorDonationAmount ?Amount ." +
                "?financial_donations bd:hasFinancialDonorMessage ?Message ." +
                "filter(?ID = \"" + ID + "\")" +

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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
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
    public String AddJobPostDetails(@BodyRequest String JobPostDetails) throws IOException {

        /*
         * String postingDate = "10 April, 2023";
         * String title = "System Maintenance";
         * String details = "Required the expert for the System maintance";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(JobPostDetails);

        String postingDate = jsonNode.has("postingDate") ? jsonNode.get("postingDate").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;

        String individualId = "Job_Post_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Job_Post ;\n" +
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
    /*
     * Method to update Job Post
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/jobPost/JobPostDetails/update/{ID}")
    public String UpdateJobPostDetails(@PathVariable String ID, @RequestBody String jobPost)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jobPost);

        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String postingDate = jsonNode.has("postingDate") ? jsonNode.get("postingDate").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?jobpost bd:hasJobPostTitle ?Title ." +
                "?jobpost bd:hasJobPostDetails ?Details ." +
                "?jobpost bd:hasJobPostPostingDate ?PostingDate ." +
                "INSERT { ?jobpost bd:hasJobPostTitle \"" + title + "\"^^xsd:string ." +
                " ?jobpost bd:hasJobPostDetails \"" + details + "\"^^xsd:string ." +
                " ?jobpost bd:hasJobPostPostingDate \"" + postingDate + "\"^^xsd:string ." +
                "WHERE { ?jobpost rdf:type bd:Job_Post ." +
                "?jobpost bd:hasJobPostDetails ?Details ." +
                "?jobpost bd:hasJobPostTitle ?Title ." +
                "?jobpost bd:hasJobPostPostingDate ?PostingDate ." +
                "?jobpost bd:hasJobPostID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Job Post runs successfully " + ID;
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
                "?jobs bd:hasJobPostID ?ID ." +
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
    @GetMapping("/api/admin/getJobPost/{ID}")
    public ResponseEntity<String> getJobPostById(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?jobs rdf:type bd:Job_Post ." +
                "?jobs bd:hasJobPostTitle ?Title ." +
                "?jobs bd:hasJobPostID ?ID ." +
                "?jobs bd:hasJobPostDetails ?Details ." +
                "?jobs bd:hasJobPostPostingDate ?Date " +
                "filter(?ID = \"" + ID + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
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
    public String AddFrequentlyAskedQuestionDetails(@BodyRequest String FAQSDetails) throws IOException {
        /*
         * String title = "How to donate blood?";
         * String details = "Here is the details about the blood donation";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(FAQSDetails);

        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;

        String individualId = "FAQ_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Frequently_Asked_Question ;\n" +
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
    @PutMapping("/api/admin/faq/FAQDetails/update/{ID}")
    public String UpdateFrequentlyAskedQuestionDetails(@PathVariable String ID, @RequestBody String faq)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(faq);

        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?faq bd:hasFAQTitle ?Title ." +
                "?faq bd:hasFAQDetails ?Details ." +
                "INSERT { ?faq bd:hasFAQTitle \"" + title + "\"^^xsd:string ." +
                " ?faq bd:hasFAQDetails \"" + details + "\"^^xsd:string ." +
                "WHERE { ?faq rdf:type bd:Frequently_Asked_Question ." +
                "?faq bd:hasFAQDetails ?Details ." +
                "?faq bd:hasFAQTitle ?Title ." +
                "?faq bd:hasFAQID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Frequently_Asked_Question runs successfully " + ID;
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
                "?faqs bd:hasFAQID ?ID ." +
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
    @GetMapping("/api/admin/getFAQ/{ID}")
    public ResponseEntity<String> getFAQById(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?faqs rdf:type bd:Frequently_Asked_Question ." +
                "?faqs bd:hasFAQID ?ID ." +
                "?faqs bd:hasFAQTitle ?Title ." +
                "?faqs bd:hasFAQDetails ?Details ." +
                "filter(?ID = " + ID + ")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
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
    public String AddCampaignDetails(@BodyRequest String Compaign) throws IOException {
        /*
         * String title = "Campaign Title";
         * String details = "Details about the Compaigns";
         * String postDate = "9th April, 2023";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(Compaign);

        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;
        String postDate = jsonNode.has("postDate") ? jsonNode.get("postDate").asText() : null;

        String individualId = "Campaign_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Campaign ;\n" +
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
    /*
     * Method to update Campaign
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/campaign/CampaignDetails/update/{ID}")
    public String UpdateCampaignDetails(@PathVariable String ID, @RequestBody String campaign)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(campaign);

        String postDate = jsonNode.has("postDate") ? jsonNode.get("postDate").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?campaign bd:hasCampaignsPostDate ?PostDate ." +
                "?campaign bd:hasCampaignDetails ?Details ." +
                "?campaign bd:hasCampaignTitle ?Title ." +
                "INSERT { ?campaign bd:hasCampaignsPostDate \"" + postDate + "\"^^xsd:string ." +
                " ?campaign bd:hasCampaignDetails \"" + details + "\"^^xsd:string ." +
                " ?campaign bd:hasCampaignTitle \"" + title + "\"^^xsd:string ." +
                "WHERE { ?campaign rdf:type bd:Campaign ." +
                "?campaign bd:hasCampaignsPostDate ?PostDate ." +
                "?campaign bd:hasCampaignDetails ?Details ." +
                "?campaign bd:hasCampaignTitle ?Title ." +
                "?campaign bd:hasCampaignID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Campaign runs successfully " + ID;
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
                "?campaigns bd:hasCampaignID ?ID ." +
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
    @GetMapping("/api/admin/getCompaigns/{ID}")
    public ResponseEntity<String> getCompaignsById(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?campaigns rdf:type bd:Campaign ." +
                "?campaigns bd:hasCampaignID ?ID ." +
                "?campaigns bd:hasCampaignTitle ?Title ." +
                "?campaigns bd:hasCampaignDetails ?Details ." +
                "?campaigns bd:hasCampaignsPostDate ?Date ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if ID is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Add the News in the Database
     */

    @PostMapping("/api/admin/addNews")
    public String AddNewsDetails(@BodyRequest String News) throws IOException {
        /*
         * String postDate = "10th April, 2023";
         * String title = "News Title";
         * String details = "News Details";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(News);

        String postDate = jsonNode.has("postDate") ? jsonNode.get("postDate").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;

        String individualId = "News_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:News ;\n" +
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
     * Method to update News
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/news/NewsDetails/update/{ID}")
    public String UpdateNewsDetails(@PathVariable String ID, @RequestBody String news)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(news);

        String postDate = jsonNode.has("postDate") ? jsonNode.get("postDate").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?news bd:hasNewsPostDate ?PostDate ." +
                "?news bd:hasNewsDetails ?Details ." +
                "?news bd:hasNewsTitle ?Title ." +
                "INSERT { ?news bd:hasNewsPostDate \"" + postDate + "\"^^xsd:string ." +
                " ?news bd:hasNewsDetails \"" + details + "\"^^xsd:string ." +
                " ?news bd:hasNewsTitle \"" + title + "\"^^xsd:string ." +
                "WHERE { ?news rdf:type bd:News ." +
                "?news bd:hasNewsPostDate ?PostDate ." +
                "?news bd:hasNewsDetails ?Details ." +
                "?news bd:hasNewsTitle ?Title ." +
                "?news bd:hasNewsID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update News runs successfully " + ID;
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
                "?news bd:hasNewsID ?ID ." +
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
     * Get the News by ID
     */
    @GetMapping("/api/admin/getNews/{ID}")
    public ResponseEntity<String> getNewsById(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?news rdf:type bd:News ." +
                "?news bd:hasNewsID ?ID ." +
                "?news bd:hasNewsTitle ?Title ." +
                "?news bd:hasNewsDetails ?Details ." +
                "?news bd:hasNewsPostDate ?Date" +
                "filter(?ID = \"" + ID + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if ID is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Method to update Advertisement
     * ID is passed as the first parameter
     */
    @PutMapping("/api/admin/advertisement/AdvertisementDetails/update/{ID}")
    public String UpdateAdvertisementDetails(@PathVariable String ID, @RequestBody String advertisement)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(advertisement);

        String postDate = jsonNode.has("postDate") ? jsonNode.get("postDate").asText() : null;
        String details = jsonNode.has("details") ? jsonNode.get("details").asText() : null;
        String title = jsonNode.has("title") ? jsonNode.get("title").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?advertisement bd:hasAdvertisementPostDate ?PostDate ." +
                "?advertisement bd:hasAdvertisementDetails ?Details ." +
                "?advertisement bd:hasAdvertisementTitle ?Title ." +
                "INSERT { ?advertisement bd:hasAdvertisementPostDate \"" + postDate + "\"^^xsd:string ." +
                " ?advertisement bd:hasAdvertisementDetails \"" + details + "\"^^xsd:string ." +
                " ?advertisement bd:hasAdvertisementTitle \"" + title + "\"^^xsd:string ." +
                "WHERE { ?advertisement rdf:type bd:Advertisement ." +
                "?advertisement bd:hasAdvertisementPostDate ?PostDate ." +
                "?advertisement bd:hasAdvertisementDetails ?Details ." +
                "?advertisement bd:hasAdvertisementTitle ?Title ." +
                "?advertisement bd:hasAdvertisementID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Advertisement runs successfully " + ID;
    }

    /*
     * Add the Events in the Database
     */
    @PostMapping("/api/admin/addEvents")
    public String AddEventDetails(@BodyRequest String Event) throws IOException {
        /*
         * String name = "Event Name";
         * String location = "Main Street, Karachi";
         * String message = "Event about Blood dONATION";
         * String dateTime = "9th Feb, 2023";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(Event);

        String name = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String dateTime = jsonNode.has("dateTime") ? jsonNode.get("dateTime").asText() : null;

        String individualId = "Event_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Event ;\n" +
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
    @PutMapping("/api/admin/event/eventDetails/update/{ID}")
    public String UpdateEventDetails(@PathVariable String ID, @RequestBody String event)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(event);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String dateTime = jsonNode.has("dateTime") ? jsonNode.get("dateTime").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?event bd:hasEventName ?Name ." +
                "?event bd:hasEventLocation ?Location ." +
                "?event bd:hasEventMessage ?Message ." +
                "?event bd:hasEventDateTime ?DateTime ." +
                "INSERT { ?event bd:hasEventName \"" + name + "\"^^xsd:string ." +
                " ?event bd:hasEventLocation \"" + location + "\"^^xsd:string ." +
                " ?event bd:hasEventMessage \"" + message + "\"^^xsd:string ." +
                " ?event bd:hasEventDateTime \"" + dateTime + "\"^^xsd:dateTime ." +
                "WHERE { ?event rdf:type bd:Event ." +
                "?event bd:hasEventName ?Name ." +
                "?event bd:hasEventDateTime ?DateTime ." +
                "?event bd:hasEventLocation ?Location ." +
                "?event bd:hasEventMessage ?Message ." +
                "?event bd:hasEventID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);
        return "Update Event runs successfully " + ID;
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
                "?events bd:hasEventID ?ID ." +
                "?events bd:hasEventTitle ?Title ." +
                "?events bd:hasEventDetails ?Details ." +
                "?events bd:hasEventPostDate ?Date" +
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
    @GetMapping("/api/admin/getEvents/{ID}")
    public ResponseEntity<String> getEventsById(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?events rdf:type bd:Events ." +
                "?events bd:hasEventTitle ?Title ." +
                "?events bd:hasEventID ?ID ." +
                "?events bd:hasEventDetails ?Details ." +
                "?events bd:hasEventPostDate ?Date" +
                "filter(?ID = \"" + ID + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + ID + "\"}";
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
    static void UpdateSparql(String queryString) throws IOException {
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
        UpdateAction.parseExecute(queryString, model);

        // Print the updated model
        System.out.printf("Updated model:", model);

        // Write the updated model to a file
        FileOutputStream out = new FileOutputStream(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
        model.write(out, "RDF/XML-ABBREV");
        out.close();

    }
}
