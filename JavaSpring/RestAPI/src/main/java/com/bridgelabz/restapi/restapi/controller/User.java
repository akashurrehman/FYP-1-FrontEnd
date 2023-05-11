package com.bridgelabz.restapi.restapi.controller;

import java.io.*;
import org.springframework.http.HttpHeaders;

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

//import for password encryption
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
public class User {

    /*
     * Managed by Akash Ur Rehman
     * Last Updated on 25/03/2020 11:00 PM
     * All Routes are added for FRs
     * No Hard Coded Data
     * All the functionality perform on the basis of ID
     * Pass Data in Json format for POST AND PUT Requests
     */

    // Path for Ontology file
    public static final String ONTOLOGY_FILE_LOCAL_PATH = "D:/FYP/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl";

    /*
     * Route to Get Data of all Registered Users
     */

    @GetMapping("/api/users/registration")
    public ResponseEntity<String> Allusers() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasPersonID ?ID ." +
                "?persons bd:hasPersonFullName ?Name ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "?persons bd:hasUserName ?UserName ." +
                "?persons bd:hasPersonContactNo ?ContactNo ." +
                "?persons bd:hasPersonAddress ?Address ." +
                "?persons bd:hasPersonBloodGroup ?BloodGroup ." +
                "?persons bd:hasPersonDateOfBirth ?DOB ." +
                "?persons bd:hasPersonGender ?Gender ." +
                "?persons bd:hasPersonCity ?City ." +
                "?persons bd:hasPersonEligibilityStatus ?EligibilityStatus ." +
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
     * Route to Get Data of Single User by passing Email
     * ID is passed in the URL
     * Through ID we can find the User Information
     */
    @GetMapping("/api/users/registration/{ID}")
    public ResponseEntity<String> Singleuser(@PathVariable String ID) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasPersonFullName ?Name ." +
                "?persons bd:hasUserName ?UserName ." +
                "?persons bd:hasPersonID ?ID ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "?persons bd:hasPersonContactNo ?ContactNo ." +
                "?persons bd:hasPersonAddress ?Address ." +
                "?persons bd:hasPersonBloodGroup ?BloodGroup ." +
                "?persons bd:hasPersonDateOfBirth ?DOB ." +
                "?persons bd:hasPersonGender ?Gender ." +
                "?persons bd:hasPersonCity ?City ." +
                "?persons bd:hasPersonEligibilityStatus ?EligibilityStatus ." +
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
     * Route to Register the Users
     * Users have to enter information such as Email, Username and password
     */
    @PostMapping("/api/user/registration/add")
    public ResponseEntity<String> AddPersonDetails(@RequestBody String User) throws IOException {
        System.out.print(User);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(User);

        String fullName = jsonNode.has("fullName") ? jsonNode.get("fullName").asText() : null;
        String userName = jsonNode.has("userName") ? jsonNode.get("userName").asText() : null;
        String password = jsonNode.has("password") ? jsonNode.get("password").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String dob = jsonNode.has("dob") ? jsonNode.get("dob").asText() : null;
        String role = "USER";
        String eligibilityStatus = "Not Eligible";

        String individualId = "Person_" + System.currentTimeMillis();

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
                            "bd:" + individualId + " rdf:type bd:Person ;\n" +
                            "   rdf:type bd:Donor ;\n" +
                            "   rdf:type bd:Request_Maker ;\n" +
                            "                       bd:hasPersonFullName \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasUserName \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPassword \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasRole \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonCity \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonBloodGroup \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonAddress \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonContactNo \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonEmail \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonGender \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonDateOfBirth \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonEligibilityStatus \"%s\"^^xsd:string ;\n" +
                            "                       bd:hasPersonID \"%s\"^^xsd:string ;\n" +
                            "}",
                    fullName, userName, encodedPassword, role, city, bloodGroup, address, contactNo, email, gender, dob, eligibilityStatus,
                    individualId);

            // Call the InsertSparql function with the query
            boolean isInserted = InsertSparql(query);

            if (isInserted) {
                String successMessage = "{\"success\": \"Data inserted successfully\"}";
                // Send a push notification to the admin
                // PushNotificationService pushNotificationService = new
                // PushNotificationService();
                // pushNotificationService.sendNotification("New blood request", "A new blood
                // request has been made.");

                return new ResponseEntity<String>(successMessage, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error occurred while inserting data");
            }
        } else {
            String errorMessage = "{\"error\": \"User with this username and email already exit: " + userName + "\"}";

            // PushNotificationService pushNotificationService = new
            // PushNotificationService();
            // pushNotificationService.sendNotification("New blood request", "A new blood
            // request has been made.");
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
    }

    /*
     * Edit the User Information by passing ID
     * 
     * @param id
     * User can edit the information such as Email, Username and password
     */
    @PutMapping("/api/users/edit/{ID}")
    public ResponseEntity<String> editUser(@RequestBody String User, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(User);

        String fullName = jsonNode.has("fullName") ? jsonNode.get("fullName").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String dob = jsonNode.has("dob") ? jsonNode.get("dob").asText() : null;
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?person bd:hasPersonCity ?City ." +
                "?person bd:hasPersonContactNo ?ContactNo ." +
                "?person bd:hasPersonAddress ?Address ." +
                "?person bd:hasPersonFullName ?FullName ." +
                "?person bd:hasPersonGender ?Gender ." +
                "?person bd:hasPersonEmail ?Email ." +
                "?person bd:hasPersonDateOfBirth ?DateOfBirth ." +
                "?person bd:hasPersonBloodGroup ?BloodGroup }" +
                "INSERT { ?person bd:hasPersonCity \"" + city + "\"^^xsd:string ." +
                " ?person bd:hasPersonContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?person bd:hasPersonFullName \"" + fullName + "\"^^xsd:string ." +
                " ?person bd:hasPersonGender \"" + gender + "\"^^xsd:string ." +
                " ?person bd:hasPersonEmail \"" + email + "\"^^xsd:string ." +
                " ?person bd:hasPersonDateOfBirth \"" + dob + "\"^^xsd:string ." +
                " ?person bd:hasPersonBloodGroup \"" + bloodGroup + "\"^^xsd:string ." +
                " ?person bd:hasPersonAddress \"" + address + "\"^^xsd:string } " +
                "WHERE { ?person rdf:type bd:Person ." +
                "?person bd:hasPersonCity ?City ." +
                "?person bd:hasPersonContactNo ?ContactNo ." +
                "?person bd:hasPersonFullName ?FullName ." +
                "?person bd:hasPersonGender ?Gender ." +
                "?person bd:hasPersonEmail ?Email ." +
                "?person bd:hasPersonDateOfBirth ?DateOfBirth ." +
                "?person bd:hasPersonBloodGroup ?BloodGroup ." +
                "?person bd:hasPersonAddress ?Address ." +
                "?person bd:hasPersonID ?ID ." +
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
     * Delete the User Information by passing ID
     * Delete all the information of the user
     */

    @DeleteMapping("/api/users/delete/{id}")

    public ResponseEntity<String> DeletePersonDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Person ;\n" +
                "                            bd:hasPersonID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }

    }


    /*
     * Edit the User Information by passing ID
     * 
     * @param id
     * User can edit the information only eligibility status
     */
    @PutMapping("/api/users/edit/eligibilityStatus/{ID}")
    public ResponseEntity<String> editUserEligibilityStatus(@RequestBody String User, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(User);

        String eligibilityStatus = jsonNode.has("eligibilityStatus") ? jsonNode.get("eligibilityStatus").asText() : null;
        
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {" +
                "?person bd:hasPersonEligibilityStatus ?EligibleStatus }" +
                "INSERT { " +
                " ?person bd:hasPersonEligibilityStatus \"" + eligibilityStatus + "\"^^xsd:string } " +
                "WHERE { ?person rdf:type bd:Person ." +
                "?person bd:hasPersonEligibilityStatus ?EligibleStatus ." +
                "?person bd:hasPersonID ?ID ." +
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
     * Donate Blood
     * Add the information of the Donor in the Database
     */
    @PostMapping("/api/users/donate/addDonorInfo")
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

        String id = jsonNode.has("id") ? jsonNode.get("id").asText() : null;
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
                        "                       bd:bloodDonationMakeby bd:%s .\n" +
                        "}",
                name, individualId, city, gender, location, contactNo, bloodGroup, email, message,id);
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
     * Method to update Blood Donation
     * ID is passed as the first parameter
     */
    @PutMapping("/api/user/bloodDonors/Donors/update/{ID}")

    public ResponseEntity<String> UpdateDonorInformation(@PathVariable String ID, @RequestBody String bloodDonation)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(bloodDonation);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
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
                "?donations bd:hasDonorMessage ?Message }" +
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
     * Delete the Information of Donors who want to donate blood by passing ID
     */
    @DeleteMapping("/api/user/deleteBloodDonation/bloodDonationDetails/delete/{id}")
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
     * Get the Information of all the Donors
     * Get the Information of all the Donors who donate blood
     */
    @GetMapping("/api/users/donate")
    public ResponseEntity<String> Alldonations() {

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

        // Check if No result is found
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"Record Not Found: \"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * GET the Information of the Donors by passing ID
     */
    @GetMapping("/api/users/donate/{ID}")
    public ResponseEntity<String> GetdonatebyID(@PathVariable String ID) {

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

    /*
     * GET the Information of the Donors by passing ID
     */
    @GetMapping("/api/users/donate/byUserID/{id}")
    public ResponseEntity<String> GetdonatebyUserID(@PathVariable String id) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:bloodDonationMakeby bd:" + id + " ." +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }



    /*
     * Add Blood Request
     * Can by add by Users or centers
     */
    @PostMapping("/api/user/bloodRequest/BloodRequestDetails/add")
    public ResponseEntity<String> AddBloodRequestDetails(@RequestBody String bloodRequest) throws IOException {

        System.out.print(bloodRequest);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(bloodRequest);

        String id = jsonNode.has("id") ? jsonNode.get("id").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String hospital = jsonNode.has("hospital") ? jsonNode.get("hospital").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String message = jsonNode.has("message") ? jsonNode.get("message").asText() : null;
        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String gender = jsonNode.has("gender") ? jsonNode.get("gender").asText() : null;
        String location = jsonNode.has("location") ? jsonNode.get("location").asText() : null;
        String donatedBy = "null";
        String donorName = "null";

        String individualId = "Request_" + System.currentTimeMillis();
        System.out.print(individualId);
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
                        "                       bd:hasRequestDonatedBy \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasRequestDonorName \"%s\"^^xsd:string ;\n" +
                        "                       bd:bloodRequestMakeby bd:%s .\n" +
                        "}",
                email, hospital, city, bloodGroup, contactNo, message, name, individualId, gender, location, donatedBy, donorName, id);
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
     * Method to update Blood Request
     * Email is passed as the first parameter
     */
    @PutMapping("/api/user/bloodRequest/BloodRequestDetails/update/{ID}")
    public ResponseEntity<String> UpdateBloodRequestDetails(@PathVariable String ID, @RequestBody String bloodRequest)
            throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(bloodRequest);

        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String hospital = jsonNode.has("hospital") ? jsonNode.get("hospital").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String bloodGroup = jsonNode.has("bloodGroup") ? jsonNode.get("bloodGroup").asText() : null;
        String contact = jsonNode.has("contact") ? jsonNode.get("contact").asText() : null;
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
                " ?requests bd:hasRequestMakerContactNo \"" + contact + "\"^^xsd:string ." +
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
     * Delete Blood Requests entered by Users
     */
    @DeleteMapping("/api/user/bloodRequest/BloodRequestDetails/delete/{id}")
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
     * View Blood Requests entered by Users
     */
    @GetMapping("/api/users/bloodrequest")
    public ResponseEntity<String> Allbloodrequest() {

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
                "?requests bd:hasRequestDonatedBy ?RequestDonatedBy ." +
                "?requests bd:hasRequestDonorName ?RequestDonorName ." +
                "?requests bd:bloodRequestMakeby ?PersonName ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if there is data or result
        JSONObject jsonObj = new JSONObject(result);
        JSONObject resultsObj = jsonObj.getJSONObject("results");
        JSONArray bindingsArr = resultsObj.getJSONArray("bindings");
        if (bindingsArr.isEmpty()) {
            String errorMessage = "{\"error\": \"No Record Found! \"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * View Blood Requests entered by users by passing ID
     */
    @GetMapping("/api/users/bloodrequest/{id}")
    public ResponseEntity<String> GetbloodrequestbyID(@PathVariable String id) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerID ?ID ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?Blood_Group ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "?requests bd:hasRequestDonatedBy ?RequestDonatedBy ." +
                "?requests bd:hasRequestDonorName ?RequestDonorName ." +
                "?requests bd:bloodRequestMakeby ?PersonName ." +
                "filter(?ID = \"" + id + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    /*
     * View Blood Requests entered by users by passing ID
     */
    @GetMapping("/api/users/accepted/bloodRequests/{id}")
    public ResponseEntity<String> GetAcceptedBloodRequestbyID(@PathVariable String id) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerID ?ID ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?Blood_Group ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "?requests bd:hasRequestDonatedBy ?RequestDonatedBy ." +
                "?requests bd:hasRequestDonorName ?RequestDonorName ." +
                "?requests bd:bloodRequestMakeby ?PersonName ." +
                "filter(?RequestDonatedBy = \"" + id + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    /*
     * View Blood Requests entered by users by passing ID
     */
    @GetMapping("/api/users/bloodrequest/byUserID/{id}")
    public ResponseEntity<String> GetbloodrequestbyUserID(@PathVariable String id) {
        
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
        
            "SELECT * WHERE {" +
            "?requests rdf:type bd:Blood_Request ." +
            "?requests bd:bloodRequestMakeby bd:" + id + " ." +
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
            "?requests bd:hasRequestDonatedBy ?RequestDonatedBy ." +
            "?requests bd:hasRequestDonorName ?RequestDonorName ." +
            "?requests bd:bloodRequestMakeby ?PersonName ." +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    /*
     * Edit the User Information by passing ID
     * 
     * @param id
     * User can edit the information only eligibility status
     */
    @PutMapping("/api/users/accept/bloodRequest/{ID}")
    public ResponseEntity<String> acceptBloodRequest(@RequestBody String User, @PathVariable String ID)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(User);

        String donatedBy = jsonNode.has("donatedBy") ? jsonNode.get("donatedBy").asText() : null;
        String donorName = jsonNode.has("donorName") ? jsonNode.get("donorName").asText() : null;
        
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?request bd:hasRequestDonorName ?DonorName ." +
                "?request bd:hasRequestDonatedBy ?RequestDonatedBy }" +
                "INSERT { ?request bd:hasRequestDonorName \"" + donorName + "\"^^xsd:string ." +
                " ?request bd:hasRequestDonatedBy \"" + donatedBy + "\"^^xsd:string } " +
                "WHERE { ?request rdf:type bd:Blood_Request ." +
                "?request bd:hasRequestDonorName ?DonorName ." +
                "?request bd:hasRequestDonatedBy ?RequestDonatedBy ." +
                "?request bd:hasRequestMakerID ?ID ." +
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
     * Appointment Details of Users such as Center, Timing
     * Missing Sparql Query
     * Add the Appointment Details of Users in the Database
     */
    @PostMapping("/api/user/appointment/AppointmentDetails/add")
    public ResponseEntity<String> AddAppointmentDetails(@RequestBody String appointment) throws IOException {

        System.out.print(appointment);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(appointment);

        String userID = jsonNode.has("userID") ? jsonNode.get("userID").asText() : null;
        String centreID = jsonNode.has("centreID") ? jsonNode.get("centreID").asText() : null;
        String donorName = jsonNode.has("donorName") ? jsonNode.get("donorName").asText() : null;
        String donorDOB = jsonNode.has("donorDOB") ? jsonNode.get("donorDOB").asText() : null;
        String donorEmail = jsonNode.has("donorEmail") ? jsonNode.get("donorEmail").asText() : null;
        String donorContactNo = jsonNode.has("donorContactNo") ? jsonNode.get("donorContactNo").asText() : null;
        String donorGender = jsonNode.has("donorGender") ? jsonNode.get("donorGender").asText() : null;
        String donorAddress = jsonNode.has("donorAddress") ? jsonNode.get("donorAddress").asText() : null;
        String donorCity = jsonNode.has("donorCity") ? jsonNode.get("donorCity").asText() : null;
        String donorBloodGroup = jsonNode.has("donorBloodGroup") ? jsonNode.get("donorBloodGroup").asText() : null;
        String centreName = jsonNode.has("centreName") ? jsonNode.get("centreName").asText() : null;
        String centreTimings = jsonNode.has("centreTimings") ? jsonNode.get("centreTimings").asText() : null;
        String centreContactNo = jsonNode.has("centreContactNo") ? jsonNode.get("centreContactNo").asText() : null;
        String centreEmail = jsonNode.has("centreEmail") ? jsonNode.get("centreEmail").asText() : null;
        String centreLocation = jsonNode.has("centreLocation") ? jsonNode.get("centreLocation").asText() : null;

        String individualId = "Appointment_" + System.currentTimeMillis();
        System.out.print(individualId);

        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Appointment ;\n" +
                        "                       bd:hasAppointmentDonorName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorDOB \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorGender \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorAddress \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorCity \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentDonorBloodGroup \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentCentreName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentCentreTimings \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentCentreContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentCentreEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentCentreLocation \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasAppointmentID \"%s\"^^xsd:string ;\n" +
                        "                       bd:appointmentMadeBy bd:%s ;\n" +
                        "                       bd:appointmentBookedIn bd:%s ;\n" +
                        "}",
                donorName, donorDOB, donorEmail, donorContactNo, donorGender, donorAddress, donorCity, donorBloodGroup, centreName, centreTimings, centreContactNo, centreEmail, centreLocation, individualId, userID, centreID);
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
     * Edit the Appointment Details of Users by passing ID
     * Edit information such as center, or timing
    */

    @PutMapping("/api/users/appointment/{id}")
    public String editAppointment(@RequestBody String user, @PathVariable String id) {
        return "User: " + id;
    }

    /*
     * Delete the Appointment Details of Users by passing ID
     */
    
    @DeleteMapping("/api/user/appointment/AppointmentDetails/delete/{id}")
    public ResponseEntity<String> DeleteAppointment(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Appointment ;\n" +
                "                            bd:hasAppointmentID \"" + id + "\" ;" +
                "}";
        boolean success = DeleteSparql(queryString);
        if (success) {
            return ResponseEntity.ok("Deletion successful");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Deletion failed");
        }
    }

    /*
     * GET the Appointment Details of Users by passing ID
     * Appointment details such as center, or timing
     */

    @GetMapping("/api/users/appointment")
    public String appointment() {
        return "All Appointments";
    }

    /*
     * GET the Appointment Details of Users by passing  User ID
     * Appointment details such as center, or timing
     */
    @GetMapping("/api/users/appointment/byUserID/{id}")
    public ResponseEntity<String> GetAppointmentMadeByUser(@PathVariable String id) {
        
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
        
            "SELECT * WHERE {" +
            "?appointments rdf:type bd:Appointment ." +
            "?appointments bd:appointmentMadeBy bd:" + id + " ." +
            "?appointments bd:hasAppointmentID ?ID ." +
            "?appointments bd:hasAppointmentDonorName ?DonorName ." +
            "?appointments bd:hasAppointmentDonorDOB ?DOB ." +
            "?appointments bd:hasAppointmentDonorEmail ?DonorEmail ." +
            "?appointments bd:hasAppointmentDonorContactNo ?DonorContactNo ." +
            "?appointments bd:hasAppointmentDonorGender ?Gender ." +
            "?appointments bd:hasAppointmentDonorAddress ?Address ." +
            "?appointments bd:hasAppointmentDonorCity ?City ." +
            "?appointments bd:hasAppointmentDonorBloodGroup ?BloodGroup ." +
            "?appointments bd:hasAppointmentCentreName ?CentreName ." +
            "?appointments bd:hasAppointmentCentreTimings ?Timings ." +
            "?appointments bd:hasAppointmentCentreContactNo ?CentreContactNo ." +
            "?appointments bd:hasAppointmentCentreEmail ?CentreEmail ." +
            "?appointments bd:hasAppointmentCentreLocation ?Location ." +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    /*
     * GET the Appointment Details of Users by passing  User ID
     * Appointment details such as center, or timing
     */
    @GetMapping("/api/users/appointment/byCentreID/{id}")
    public ResponseEntity<String> GetAppointmentBookedInCentre(@PathVariable String id) {
        
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
            "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
        
            "SELECT * WHERE {" +
            "?appointments rdf:type bd:Appointment ." +
            "?appointments bd:appointmentBookedIn bd:" + id + " ." +
            "?appointments bd:hasAppointmentID ?ID ." +
            "?appointments bd:hasAppointmentDonorName ?DonorName ." +
            "?appointments bd:hasAppointmentDonorDOB ?DOB ." +
            "?appointments bd:hasAppointmentDonorEmail ?DonorEmail ." +
            "?appointments bd:hasAppointmentDonorContactNo ?DonorContactNo ." +
            "?appointments bd:hasAppointmentDonorGender ?Gender ." +
            "?appointments bd:hasAppointmentDonorAddress ?Address ." +
            "?appointments bd:hasAppointmentDonorCity ?City ." +
            "?appointments bd:hasAppointmentDonorBloodGroup ?BloodGroup ." +
            "?appointments bd:hasAppointmentCentreName ?CentreName ." +
            "?appointments bd:hasAppointmentCentreTimings ?Timings ." +
            "?appointments bd:hasAppointmentCentreContactNo ?CentreContactNo ." +
            "?appointments bd:hasAppointmentCentreEmail ?CentreEmail ." +
            "?appointments bd:hasAppointmentCentreLocation ?Location ." +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    /*
     * View Appointments entered by users by passing ID
     */
    @GetMapping("/api/users/appointments/{id}")
    public ResponseEntity<String> GetAppointmentsbyID(@PathVariable String id) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
            
                "SELECT * WHERE {" +
                "?appointments rdf:type bd:Appointment ." +
                "?appointments bd:hasAppointmentID ?ID ." +
                "?appointments bd:hasAppointmentDonorName ?DonorName ." +
                "?appointments bd:hasAppointmentDonorDOB ?DOB ." +
                "?appointments bd:hasAppointmentDonorEmail ?DonorEmail ." +
                "?appointments bd:hasAppointmentDonorContactNo ?DonorContactNo ." +
                "?appointments bd:hasAppointmentDonorGender ?Gender ." +
                "?appointments bd:hasAppointmentDonorAddress ?Address ." +
                "?appointments bd:hasAppointmentDonorCity ?City ." +
                "?appointments bd:hasAppointmentDonorBloodGroup ?BloodGroup ." +
                "?appointments bd:hasAppointmentCentreName ?CentreName ." +
                "?appointments bd:hasAppointmentCentreTimings ?Timings ." +
                "?appointments bd:hasAppointmentCentreContactNo ?CentreContactNo ." +
                "?appointments bd:hasAppointmentCentreEmail ?CentreEmail ." +
                "?appointments bd:hasAppointmentCentreLocation ?Location ." +
                "filter(?ID = \"" + id + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using ID: " + id + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }



    /*
     * Method for the Functionality of Read data on the basis of query
     */
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

    /*
     * Method for the Functionality of Inserting data on the basis of query
     */
    static boolean InsertSparql(String query) throws IOException {
        // create a file object for the RDF file
        File file = new File(ONTOLOGY_FILE_LOCAL_PATH);
        System.out.println("File Path: " + file);

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

            return true; // data insertion successful
        } catch (Exception e) {
            e.printStackTrace();
            return false; // data insertion unsuccessful
        }
    }

    /*
     * Method for the Functionality of Deleting data on the basis of query
     */
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
            return true; // data insertion successful

        } catch (Exception e) {
            e.printStackTrace();
            return false; // data insertion unsuccessful
        }
    }

    /*
     * Method for Functionality of Updating Data using SPARQL query
     */
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

            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(ONTOLOGY_FILE_LOCAL_PATH);
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true; // data insertion successful

        } catch (Exception e) {
            e.printStackTrace();
            return false; // data insertion unsuccessful
        }

    }
}