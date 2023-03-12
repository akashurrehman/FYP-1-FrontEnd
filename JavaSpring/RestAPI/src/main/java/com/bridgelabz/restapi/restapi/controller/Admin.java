package com.bridgelabz.restapi.restapi.controller;

import java.io.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import org.apache.jena.query.Dataset;
//import org.apache.jena.query.DatasetFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.*;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.update.UpdateAction;
import org.apache.jena.update.UpdateExecutionFactory;
import org.apache.jena.update.UpdateFactory;
import org.springframework.http.HttpHeaders;

import org.apache.jena.update.UpdateRequest;
//import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

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
    @DeleteMapping("/api/admin/deleteFinancialDonation/{Name}")
    public String deleteFinancialDonation(@PathVariable String Name) {
        return "FinancialDonation" + Name;
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
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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
}
