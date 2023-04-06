package com.bridgelabz.restapi.restapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

//import for password encryption
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController

public class BloodCenter {

    /*
     * Managed by Akash Ur Rehman
     * Last Updated on 4/03/2020 11:00 PM
     * All Routes are added for FRs
     * No Hard Coded Data
     * All the Functionality perform on the basis of ID
     * Pass Data in Json format for POST AND PUT Requests
     */

    // Path for Ontology file
    public static final String ONTOLOGY_FILE_LOCAL_PATH = "D:/FYP/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl";

    /* Route to Get Data of all blood Donation Centers */
    @GetMapping("/api/bloodCenter/RegisteredCenters")
    public ResponseEntity<String> Allcenters() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasCentreName ?Name ." +
                "?centres bd:hasUserName ?UserName ." +
                "?centres bd:hasCentreID ?ID ." +
                "?centres bd:hasCentreEmail ?Email ." +
                "?centres bd:hasCentreContactNo ?ContactNo ." +
                "?centres bd:hasCentreLocation ?Location ." +
                "?centres bd:hasCentreTimings ?Timings ." +
                "?centres bd:hasCentreCategory ?Category ." +
                "?centres bd:hasCentreLicenseNo ?License ." +
                "?centres bd:hasCentreCity ?City ." +
                "?centres bd:hasCentreOpeningDays ?Opening_Days ." +
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
            String errorMessage = "{\"error\": \"No Data Found!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /* Route to Get Data of Single blood Donation Center by passing License */
    @GetMapping("/api/bloodCenter/RegisteredCenters/{ID}")
    public ResponseEntity<String> Singlecenter(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasCentreName ?Name ." +
                "?centres bd:hasCentreID ?ID ." +
                "?centres bd:hasCentreEmail ?Email ." +
                "?centres bd:hasCentreContactNo ?ContactNo ." +
                "?centres bd:hasCentreLocation ?Location ." +
                "?centres bd:hasCentreTimings ?Timings ." +
                "?centres bd:hasCentreCategory ?Category ." +
                "?centres bd:hasCentreLicenseNo ?License ." +
                "?centres bd:hasCentreCity ?City ." +
                "?centres bd:hasCentreOpeningDays ?Opening_Days ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if License is found
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

    /* Route to add New Blood Donation Center */
    @PostMapping("/api/bloodCenter/CenterRegistration/add")
    public ResponseEntity<String> AddCentreDetails(@RequestBody String BloodCenterRegistration) throws IOException {
        /*
         * String name = "Al Qabeer Foundation";
         * String city = "Lahore";
         * String location = "Near Main Market, Lahore";
         * String licenseNo = "ALQabeer-1234";
         * String contactNo = "+923487456987";
         * String email = "alqabeer@email.com";
         * String openingDays = "Monday to Friday";
         * String timings = "9am-6pm";
         * String category = "Private";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(BloodCenterRegistration);

        String userName = jsonNode.has("userName") ? jsonNode.get("userName").asText() : null;
        String password = jsonNode.has("password") ? jsonNode.get("password").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String licenseNo = jsonNode.has("licenseNo") ? jsonNode.get("licenseNo").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String openingDays = jsonNode.has("openingDays") ? jsonNode.get("openingDays").asText() : null;
        String timings = jsonNode.has("timings") ? jsonNode.get("timings").asText() : null;
        String category = jsonNode.has("category") ? jsonNode.get("category").asText() : null;
        String role = "CENTRE";

        String individualId = "Centre_" + System.currentTimeMillis();

        // Create new object of type BCyptPasswordEncoder Class for password encryption
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "{ " +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasUserName ?UserName ." +
                "?persons bd:hasPersonID ?ID ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "filter(?UserName = \"" + userName + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasUserName ?UserName ." +
                "?persons bd:hasPersonID ?ID ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "filter(?Email = \"" + email + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasUserName ?UserName ." +
                "?centres bd:hasCentreID ?ID ." +
                "?centres bd:hasCentreEmail ?Email ." +
                "filter(?UserName = \"" + userName + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasUserName ?UserName ." +
                "?centres bd:hasCentreID ?ID ." +
                "?centres bd:hasCentreEmail ?Email ." +
                "filter(?Email = \"" + email + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?admins rdf:type bd:Admin ." +
                "?admins bd:hasUserName ?UserName ." +
                "?admins bd:hasAdminID ?ID ." +
                "?admins bd:hasAdminEmail ?Email ." +
                "filter(?UserName = \"" + userName + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?admins rdf:type bd:Admin ." +
                "?admins bd:hasUserName ?UserName ." +
                "?admins bd:hasAdminID ?ID ." +
                "?admins bd:hasAdminEmail ?Email ." +
                "filter(?Email = \"" + email + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?labs rdf:type bd:Lab ." +
                "?labs bd:hasUserName ?UserName ." +
                "?labs bd:hasLabID ?ID ." +
                "?labs bd:hasLabEmail ?Email ." +
                "filter(?UserName = \"" + userName + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?labs rdf:type bd:Lab ." +
                "?labs bd:hasUserName ?UserName ." +
                "?labs bd:hasLabID ?ID ." +
                "?labs bd:hasLabEmail ?Email ." +
                "filter(?Email = \"" + email + "\")" +
                "}" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if UserName is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");

        if (bindingsArr.isEmpty()) {
            String query = String.format(
                    "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                            "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                            "INSERT DATA {\n" +
                            "bd:" + individualId + " rdf:type bd:Blood_Donation_Centre ;\n" +
                            "                       bd:hasCentreCategory \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasUserName \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPassword \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasRole \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreOpeningDays \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreEmail \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreContactNo \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreID \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreTimings \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreLicenseNo \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreCity \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreName \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasCentreLocation \"%s\"^^xsd:string ;\n" +
                            "}",
                    category, userName, encodedPassword, role, openingDays, email, contactNo, individualId, timings,
                    licenseNo, city, name, location);

            // Call the InsertSparql function with the query
            boolean isInserted = InsertSparql(query);

            if (isInserted) {
                String successMessage = "{\"success\": \"Data inserted successfully\"}";
                return new ResponseEntity<String>(successMessage, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error occurred while inserting data");
            }
        } else {
            String errorMessage = "{\"error\": \"User with this username and email already exit: " + userName + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

    }

    /*
     * Route to Edit the Blood
     * ID is passed in the URL
     * Through ID we can find the Blood Donation Center
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/update/{ID}")
    public ResponseEntity<String> EditRegistedCenter(@RequestBody String center, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(center);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String licenseNo = jsonNode.has("licenseNo") ? jsonNode.get("licenseNo").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String openingDays = jsonNode.has("openingDays") ? jsonNode.get("openingDays").asText() : null;
        String timings = jsonNode.has("timings") ? jsonNode.get("timings").asText() : null;
        String category = jsonNode.has("category") ? jsonNode.get("category").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?centre bd:hasCentreLocation ?Location ." +
                "?centre bd:hasCentreName ?Name ." +
                "?centre bd:hasCentreLicenseNo ?LicenseNo ." +
                "?centre bd:hasCentreCity ?City ." +
                "?centre bd:hasCentreTimings ?Timings ." +
                "?centre bd:hasCentreContactNo ?ContactNo ." +
                "?centre bd:hasCentreEmail ?Email ." +
                "?centre bd:hasCentreOpeningDays ?OpeningDays ." +
                "?centre bd:hasCentreCategory ?Category } " +
                "INSERT { ?centre bd:hasCentreLocation \"" + location + "\"^^xsd:string ." +
                " ?centre bd:hasCentreName \"" + name + "\"^^xsd:string ." +
                " ?centre bd:hasCentreLicenseNo \"" + licenseNo + "\"^^xsd:string ." +
                " ?centre bd:hasCentreCity \"" + city + "\"^^xsd:string ." +
                " ?centre bd:hasCentreTimings \"" + timings + "\"^^xsd:string ." +
                " ?centre bd:hasCentreContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?centre bd:hasCentreEmail \"" + email + "\"^^xsd:string ." +
                " ?centre bd:hasCentreCategory \"" + category + "\"^^xsd:string ." +
                " ?centre bd:hasCentreOpeningDays \"" + openingDays + "\"^^xsd:string } " +
                "WHERE { ?centre rdf:type bd:Blood_Donation_Centre ." +
                "?centre bd:hasCentreLocation ?Location ." +
                "?centre bd:hasCentreName ?Name ." +
                "?centre bd:hasCentreLicenseNo ?LicenseNo ." +
                "?centre bd:hasCentreCity ?City ." +
                "?centre bd:hasCentreTimings ?Timings ." +
                "?centre bd:hasCentreContactNo ?ContactNo ." +
                "?centre bd:hasCentreEmail ?Email ." +
                "?centre bd:hasCentreCategory ?Category ." +
                "?centre bd:hasCentreOpeningDays ?OpeningDays ." +
                "?centre bd:hasCentreID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        boolean isInserted = UpdateSparql(queryString);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data Updated successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Route to Delete Center Information
     * ID is passed
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/delete/{id}")
    public ResponseEntity<String> DeleteCentreDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Blood_Donation_Centre ;\n" +
                "                            bd:hasCentreID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }
    }

    /**
     * Add User Information who donate blood
     * FR-14
     * Information Includes blood details and user details
     */
    @PostMapping("/api/user/bloodDonation/BloodDonationDetails/addUserInfo")
    public ResponseEntity<String> AddBloodDonationDetails(@RequestBody String UserInfo) throws IOException {
        /*
         * String name = "Mabuhurairah";
         * String gender = "Male";
         * String city = "Lahore";
         * String location = "Near SabzaZar";
         * String contactNo = "+923456852023";
         * String bloodGroup = "B-";
         * String email = "hurairah761@email.com";
         * String message = "Donate the blood for the Needy Person";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(UserInfo);

        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;

        String individualId = "Donation_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Blood_Donation ;\n" +
                        "                       bd:hasDonorName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorCity \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorGender \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorLocation \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorBloodGroup \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasDonorMessage \"%s\"^^xsd:string ;\n" +
                        "}",
                name, individualId, city, gender, location, contactNo, bloodGroup, email, message);
        // Call the InsertSparql function with the query
        boolean isInserted = InsertSparql(query);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data inserted successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /**
     * Delete User Information who donate blood
     * Information Includes blood details and user details
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/deleteUserInfo/{id}")
    public ResponseEntity<String> DeleteBloodDonationDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Blood_Donation ;\n" +
                "                            bd:hasDonorID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }
    }

    /*
     * Edit User Information who donate blood
     * Information Includes blood details and user details
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/editDonorInformations/{ID}")
    public ResponseEntity<String> editUserInfo(@RequestBody String DonorInfo, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(DonorInfo);

        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?donations bd:hasDonorName ?Name ." +
                "?donations bd:hasDonorCity ?City ." +
                "?donations bd:hasDonorGender ?Gender ." +
                "?donations bd:hasDonorLocation ?Location ." +
                "?donations bd:hasDonorContactNo ?ContactNo ." +
                "?donations bd:hasDonorBloodGroup ?BloodGroup ." +
                "?donations bd:hasDonorEmail ?Email ." +
                "?donations bd:hasDonorMessage ?Message } " +
                "INSERT { ?donations bd:hasDonorName \"" + name + "\"^^xsd:string ." +
                " ?donations bd:hasDonorEmail \"" + email + "\"^^xsd:string ." +
                " ?donations bd:hasDonorGender \"" + gender + "\"^^xsd:string ." +
                " ?donations bd:hasDonorLocation \"" + location + "\"^^xsd:string ." +
                " ?donations bd:hasDonorMessage \"" + message + "\"^^xsd:string ." +
                " ?donations bd:hasDonorBloodGroup \"" + bloodGroup + "\"^^xsd:string ." +
                " ?donations bd:hasDonorContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?donations bd:hasDonorCity \"" + city + "\"^^xsd:string } " +
                "WHERE { ?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:hasDonorName ?Name ." +
                "?donations bd:hasDonorID ?ID ." +
                "?donations bd:hasDonorEmail ?Email ." +
                "?donations bd:hasDonorGender ?Gender ." +
                "?donations bd:hasDonorLocation ?Location ." +
                "?donations bd:hasDonorMessage ?Message ." +
                "?donations bd:hasDonorBloodGroup ?BloodGroup ." +
                "?donations bd:hasDonorContactNo ?Contact ." +
                "?donations bd:hasDonorCity ?City ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        boolean isInserted = UpdateSparql(queryString);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data Updated successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Get User Information who donate blood
     * By specific id
     * Information Includes blood details and user details
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getDonorInfo/{ID}")
    public ResponseEntity<String> getDonorInfo(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:hasDonorName ?Name ." +
                "?donations bd:hasDonorID ?ID ." +
                "?donations bd:hasDonorEmail ?Email ." +
                "?donations bd:hasDonorGender ?Gender ." +
                "?donations bd:hasDonorLocation ?Location ." +
                "?donations bd:hasDonorMessage ?Message ." +
                "?donations bd:hasDonorBloodGroup ?Blood_Group ." +
                "?donations bd:hasDonorContactNo ?Contact ." +
                "?donations bd:hasDonorCity ?City ." +
                "?donations bd:hasDonorDate ?Date ." +
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
     * Get User Information who donate blood
     * Information Includes blood details and user details
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getDonorInfo")
    public ResponseEntity<String> getUserInfo() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:hasDonorName ?Name ." +
                "?donations bd:hasDonorID ?ID ." +
                "?donations bd:hasDonorEmail ?Email ." +
                "?donations bd:hasDonorGender ?Gender ." +
                "?donations bd:hasDonorLocation ?Location ." +
                "?donations bd:hasDonorMessage ?Message ." +
                "?donations bd:hasDonorBloodGroup ?Blood_Group ." +
                "?donations bd:hasDonorContactNo ?Contact ." +
                "?donations bd:hasDonorCity ?City ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);
        // Check if Email is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Data Not Found!!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get Blood Stock Details of blood Donation Centres
     * Information Includes Last date preserved and quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails")
    public ResponseEntity<String> GetbloodStockDetails() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?stocks rdf:type bd:Blood_Stock ." +
                "?stocks bd:hasBloodStockID ?ID ." +
                "?stocks bd:hasBloodStockBloodGroup ?Blood_Group ." +
                "?stocks bd:hasBloodStockNoOfBags ?No_Of_Bags ." +
                "?stocks bd:hasBloodStockAddedDate ?Gender ." +
                "}";
        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Email is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"NO RECORD FOUND!!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Blood Stock Details of blood Donation Centres by passing blood Group
     * Information Includes Last daate preserved and quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{BloodGroup}")
    public ResponseEntity<String> GetbloodStockDetailsbyID(@PathVariable String Blood_Group) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?stocks rdf:type bd:Blood_Stock ." +
                "?stocks bd:hasBloodStockBloodGroup ?Blood_Group ." +
                "?stocks bd:hasBloodStockID ?ID ." +
                "?stocks bd:hasBloodStockNoOfBags ?No_Of_Bags ." +
                "?stocks bd:hasBloodStockAddedDate ?Gender ." +
                "filter(?Blood_Group = \"" + Blood_Group + "\")" +
                "}";
        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);
        // create the response object with the JSON result and headers

        // Check if Email is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using provided Blood Group: " + Blood_Group
                    + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Add the blood stock details here
     * Send insert Sparql Query
     */
    @PostMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/add")
    public ResponseEntity<String> AddBloodStockDetails(@BodyRequest String BloodDetails) throws IOException {
        /*
         * String bloodGroup = "AB+";
         * String addedDate = "9TH FEB, 2023";
         * String noOfBags = "5";
         */

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(BloodDetails);

        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String addedDate = jsonNode.has("addedDate") ? jsonNode.get("addedDate").asText() : null;
        String noOfBags = jsonNode.has("noOfBags") ? jsonNode.get("noOfBags").asText() : null;

        String individualId = "Blood_Stock_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Blood_Stock ;\n" +
                        "                       bd:hasBloodStockID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockBloodGroup \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockAddedDate \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockNoOfBags \"%s\"^^xsd:string ;\n" +
                        "}",
                individualId, bloodGroup, addedDate, noOfBags);
        // Call the InsertSparql function with the query
        boolean isInserted = InsertSparql(query);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data inserted successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Edit Blood Stock Details of blood Donation Centres by passing id
     * Information Includes Last daate preserved and quantity
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{ID}")
    public ResponseEntity<String> EditbloodStockDetails(@RequestBody String bloodStockDetails, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(bloodStockDetails);

        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String addedDate = jsonNode.has("addedDate") ? jsonNode.get("addedDate").asText() : null;
        String noOfBags = jsonNode.has("noOfBags") ? jsonNode.get("noOfBags").asText() : null;
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?stock bd:hasBloodStockBloodGroup ?BloodGroup ." +
                "?stock bd:hasBloodStockAddedDate ?AddedDate ." +
                "?stock bd:hasBloodStockNoOfBags ?NoOfBags } " +
                "INSERT { ?stock bd:hasBloodStockBloodGroup \"" + bloodGroup + "\"^^xsd:string ." +
                " ?stock bd:hasBloodStockAddedDate \"" + addedDate + "\"^^xsd:dateTime ." +
                " ?stock bd:hasBloodStockNoOfBags \"" + noOfBags + "\"^^xsd:string } " +
                "WHERE { ?stock rdf:type bd:Blood_Stock ." +
                "?stock bd:hasBloodStockBloodGroup ?BloodGroup ." +
                "?stock bd:hasBloodStockAddedDate ?AddedDate ." +
                "?stock bd:hasBloodStockNoOfBags ?NoOfBags ." +
                "?stock bd:hasBloodStockID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        boolean isInserted = UpdateSparql(queryString);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data Updated successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Delete Blood Stock Details of blood Donation Centres by passing id
     * Information Includes Last daate preserved and quantity
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/delete/{id}")
    public ResponseEntity<String> DeleteBloodStockDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Blood_Stock ;\n" +
                "                            bd:hasBloodStockID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }
    }

    /*
     * Make the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @PostMapping("/api/bloodCenter/RegisteredCenters/makeRequest")
    public ResponseEntity<String> AddBloodRequestDetails(@RequestBody String RequestInfo) throws IOException {
        /*
         * String email = "Ahmed@email.com";
         * String hospital = "Shaukat Khanam";
         * String city = "Lahore";
         * String bloodGroup = "O-";
         * String contactNo = "+92342586025";
         * String message = "I need Blood for the Heart Transplant Patient";
         * String name = "Ahmed Ali";
         * String gender = "Male";
         * String location = "Near Main Market, Lahore";
         */
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(RequestInfo);

        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String hospital = jsonNode.has("hospital") ? jsonNode.get("hospital").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;

        String individualId = "Request_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Blood_Request ;\n" +
                        "                       bd:hasRequestMakerEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerHospital \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerCity \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerBloodGroup \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerMessage \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerGender \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestMakerLocation \"%s\"^^xsd:string ;\n" +
                        "}",
                email, hospital, city, bloodGroup, contactNo, message, name, individualId, gender, location);
        // Call the InsertSparql function with the query
        boolean isInserted = InsertSparql(query);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data inserted successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Edit the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @PutMapping("/api/bloodCenter/RegisteredCenters/editRequest/{ID}")
    public ResponseEntity<String> editRequest(@RequestBody String request, @PathVariable String ID)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request);

        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String hospital = jsonNode.has("hospital") ? jsonNode.get("hospital").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?BloodGroup ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital } " +
                "INSERT { ?requests bd:hasRequestMakerName \"" + name + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerEmail \"" + email + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerGender \"" + gender + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerLocation \"" + location + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerMessage \"" + message + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerBloodGroup \"" + bloodGroup + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerCity \"" + city + "\"^^xsd:string ." +
                " ?requests bd:hasRequestMakerHospital \"" + hospital + "\"^^xsd:string } " +
                "WHERE { ?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerID ?ID ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?BloodGroup ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        boolean isInserted = UpdateSparql(queryString);

        if (isInserted) {
            String successMessage = "{\"success\": \"Data Updated successfully\"}";
            return new ResponseEntity<String>(successMessage, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while inserting data");
        }
    }

    /*
     * Delete the Request for Blood by id
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @DeleteMapping("/api/bloodCenter/RegisteredCenters/deleteRequest/{id}")
    public ResponseEntity<String> DeleteBloodRequestDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Blood_Request ;\n" +
                "                            bd:hasRequestMakerID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }
    }

    /*
     * Get the Request for Blood
     * Include the Information such as Address, Required Blood Group, Quantity
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getRequest")
    public ResponseEntity<String> getRequest() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerID ?ID ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?Blood_Group ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Email is found
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
     * Get the Request for Blood by passing ID
     * 
     * @param requestID
     * 
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getRequest/{ID}")
    public ResponseEntity<String> getRequest(@PathVariable String ID) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerID ?ID ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?Blood_Group ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Email is found
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

    static String ReadSparqlMethod(String queryString) {

        // create a file object for the RDF file
        File file = new File(ONTOLOGY_FILE_LOCAL_PATH);

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

    static boolean InsertSparql(String query) throws IOException {
        // create a file object for the RDF file
        File file = new File(ONTOLOGY_FILE_LOCAL_PATH);

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

        try {
            // Create the update execution object and execute the query
            UpdateAction.parseExecute(query, model);

            // Print the updated model
            System.out.println("Updated model:");

            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(ONTOLOGY_FILE_LOCAL_PATH);
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;
        } catch (Exception e) {
            System.out.println("Error in Inserting Data!");
            return false;
        }
    }

    /* Method for the Funtionality of Deleting data on the basis of query */
    static boolean DeleteSparql(String query) throws IOException {
        File file = new File(ONTOLOGY_FILE_LOCAL_PATH);
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
        try {
            // Create a UpdateRequest object
            UpdateRequest updateRequest = UpdateFactory.create(query);

            // Create a QueryExecution object and execute the query on the model
            UpdateAction.execute(updateRequest, model);
            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(ONTOLOGY_FILE_LOCAL_PATH);
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;
        } catch (Exception e) {
            System.out.println("Error in Deleting Data!");
            return false;
        }
    }

    /* Method for Funtionality of Updating Data using sparql query */
    static boolean UpdateSparql(String queryString) throws IOException {
        File file = new File(ONTOLOGY_FILE_LOCAL_PATH);
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
        try {
            // Create the update execution object and execute the query
            UpdateAction.parseExecute(queryString, model);

            // Print the updated model
            System.out.printf("Updated model:", model);

            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(ONTOLOGY_FILE_LOCAL_PATH);
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;
        } catch (Exception e) {
            System.out.println("Error in Updating Data");
            return false;
        }
    }
}