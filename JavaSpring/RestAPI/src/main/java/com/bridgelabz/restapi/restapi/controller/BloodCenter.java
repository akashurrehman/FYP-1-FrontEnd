package com.bridgelabz.restapi.restapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

@RestController

public class BloodCenter {

    /* Route to Get Data of all blood Donation Centers */
    @GetMapping("/api/bloodCenter/RegisteredCenters")
    public ResponseEntity<String> Allcenters() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasCentreName ?Name ." +
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
    @GetMapping("/api/bloodCenter/RegisteredCenters/{License}")
    public ResponseEntity<String> Singlecenter(@PathVariable String License) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?centres rdf:type bd:Blood_Donation_Centre ." +
                "?centres bd:hasCentreName ?Name ." +
                "?centres bd:hasCentreEmail ?Email ." +
                "?centres bd:hasCentreContactNo ?ContactNo ." +
                "?centres bd:hasCentreLocation ?Location ." +
                "?centres bd:hasCentreTimings ?Timings ." +
                "?centres bd:hasCentreCategory ?Category ." +
                "?centres bd:hasCentreLicenseNo ?License ." +
                "?centres bd:hasCentreCity ?City ." +
                "?centres bd:hasCentreOpeningDays ?Opening_Days ." +
                "filter(?License = \"" + License + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using License: " + License + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /* Route to add New Blood Donation Center */
    @PostMapping("/api/bloodCenter/CenterRegistration/add")
    public String AddCentreDetails() throws IOException {

        String name = "Al Qabeer Foundation";
        String city = "Lahore";
        String location = "Near Main Market, Lahore";
        String licenseNo = "ALQabeer-1234";
        String contactNo = "+923487456987";
        String email = "alqabeer@email.com";
        String openingDays = "Monday to Friday";
        String timings = "9am-6pm";
        String category = "Private";

        String individualId = "bd:Centre_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Blood_Donation_Centre ;\n" +
                        "                       bd:hasCentreCategory \"%s\"^^xsd:string ;\n" +
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
                category, openingDays, email, contactNo, individualId, timings, licenseNo, city, name, location);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    @PostMapping("/api/user/bloodDonation/BloodDonationDetails/addUserInfo")
    public String AddBloodDonationDetails() throws IOException {

        String name = "Mabuhurairah";
        String gender = "Male";
        String city = "Lahore";
        String location = "Near SabzaZar";
        String contactNo = "+923456852023";
        String bloodGroup = "B-";
        String email = "hurairah761@email.com";
        String message = "Donate the blood for the Needy Person";

        String individualId = "bd:Donation_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Blood_Donation ;\n" +
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
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    @GetMapping("/api/bloodCenter/RegisteredCenters/getUserInfo/{Email}")
    public ResponseEntity<String> getUserInfo(@PathVariable String Email) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:hasDonorName ?Name ." +
                "?donations bd:hasDonorEmail ?Email ." +
                "?donations bd:hasDonorGender ?Gender ." +
                "?donations bd:hasDonorLocation ?Location ." +
                "?donations bd:hasDonorMessage ?Message ." +
                "?donations bd:hasDonorBloodGroup ?Blood_Group ." +
                "?donations bd:hasDonorContactNo ?Contact ." +
                "?donations bd:hasDonorCity ?City ." +
                "?donations bd:hasDonorDate ?Date ." +
                "filter(?Email = \"" + Email + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Email: " + Email + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Get User Information who donate blood
     * Information Includes blood details and user details
     */
    @GetMapping("/api/bloodCenter/RegisteredCenters/getUserInfo")
    public ResponseEntity<String> getUserInfo() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?donations rdf:type bd:Blood_Donation ." +
                "?donations bd:hasDonorName ?Name ." +
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
    @GetMapping("/api/bloodCenter/RegisteredCenters/bloodStockDetails/add")
    public String AddBloodStockDetails() throws IOException {

        String bloodGroup = "";
        String addedDate = "";
        String noOfBags = "";

        String individualId = "bd:Blood_Stock_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Blood_Stock ;\n" +
                        "                       bd:hasBloodStockID \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockBloodGroup \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockAddedDate \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasBloodStockNoOfBags \"%s\"^^xsd:string ;\n" +
                        "}",
                individualId, bloodGroup, addedDate, noOfBags);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
    public String AddBloodRequestDetails() throws IOException {

        String email = "Ahmed@email.com";
        String hospital = "Shaukat Khanam";
        String city = "Lahore";
        String bloodGroup = "O-";
        String contactNo = "+92342586025";
        String message = "I need Blood for the Heart Transplant Patient";
        String name = "Ahmed Ali";
        String gender = "Male";
        String location = "Near Main Market, Lahore";

        String individualId = "bd:Request_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Blood_Request ;\n" +
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
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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

        String query = "Insert Delete Query here";
        DeleteSparql(query);
        return "Request: " + id;
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
    @GetMapping("/api/bloodCenter/RegisteredCenters/getRequest/{Email}")
    public ResponseEntity<String> getRequest(@PathVariable String Email) {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?requests rdf:type bd:Blood_Request ." +
                "?requests bd:hasRequestMakerName ?Name ." +
                "?requests bd:hasRequestMakerEmail ?Email ." +
                "?requests bd:hasRequestMakerGender ?Gender ." +
                "?requests bd:hasRequestMakerLocation ?Location ." +
                "?requests bd:hasRequestMakerMessage ?Message ." +
                "?requests bd:hasRequestMakerBloodGroup ?Blood_Group ." +
                "?requests bd:hasRequestMakerContactNo ?Contact ." +
                "?requests bd:hasRequestMakerCity ?City ." +
                "?requests bd:hasRequestMakerHospital ?Hospital ." +
                "filter(?Email = \"" + Email + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Email: " + Email + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
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

    static void DeleteSparql(String query) {

    }
}