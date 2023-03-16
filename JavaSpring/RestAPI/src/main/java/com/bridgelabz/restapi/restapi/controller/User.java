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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import org.apache.jena.query.Dataset;
//import org.apache.jena.query.DatasetFactory;
import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.ontology.*;
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
import org.apache.jena.update.UpdateRequest;
import org.apache.jena.vocabulary.XSD;
import org.json.JSONArray;
import org.json.JSONObject;
//import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
public class User {

    /*
     * Class Managed by Akash
     * 
     * @author Akash
     * Date: 2023-03-10
     * 
     */

    /*
     * Check the Validity of the User by passing their CBC Report details
     * Save the CBC Report details to the database of the Users by their ID
     * Send this details to be processed by ML Algortihm
     */
    @PostMapping("/api/users/checkValidity")
    public String checkValidity(@RequestBody String user) {
        return "User: " + user;
    }
    /*
     * Check the Validity of the User by passing their CBC Report details
     */

    /*
     * Route to Get Data of all Registered Users
     */

    @GetMapping("/api/users/registration")
    public ResponseEntity<String> Allusers() {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasPersonFullName ?Name ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "?persons bd:hasPersonContactNo ?ContactNo ." +
                "?persons bd:hasPersonAddress ?Address ." +
                "?persons bd:hasPersonBloodGroup ?BloodGroup ." +
                "?persons bd:hasPersonDateOfBirth ?DOB ." +
                "?persons bd:hasPersonGender ?Gender ." +
                "?persons bd:hasPersonCity ?City ." +
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
    @GetMapping("/api/users/registration/{email}")
    public ResponseEntity<String> Singleuser(@PathVariable String email) {
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasPersonFullName ?Name ." +
                "?persons bd:hasPersonEmail ?Email ." +
                "?persons bd:hasPersonContactNo ?ContactNo ." +
                "?persons bd:hasPersonAddress ?Address ." +
                "?persons bd:hasPersonBloodGroup ?BloodGroup ." +
                "?persons bd:hasPersonDateOfBirth ?DOB ." +
                "?persons bd:hasPersonGender ?Gender ." +
                "?persons bd:hasPersonCity ?City ." +
                "filter(?Email = \"" + email + "\")" +
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
            String errorMessage = "{\"error\": \"Unable to Fetch Data by Using Email: " + email + "\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    /*
     * Route to Register the Users
     * Users have to enter information such as Email, Username and password
     */
    @PostMapping("/api/users/registration")
    public String register(@RequestBody String user) {
        return "User: " + user;
    }

    /*
     * Edit the User Information by passing ID
     * 
     * @param id
     * User can edit the information such as Email, Username and password
     */
    @PutMapping("/api/users/edit/{id}")
    public String editUser(@RequestBody String user, @PathVariable String id) {
        return "User: " + id;
    }
    /*
     * Delete the User Information by passing ID
     * Delete all the information of the user
     */

    @DeleteMapping("/api/users/delete/{id}")
    public String deleteUser(@PathVariable String id) {
        return "User: " + id;
    }

    /*
     * Donate Blood
     * Add the information of the Donor in the Database
     */
    @PostMapping("/api/users/donate")
    public String donate(@RequestBody String user) {
        return "User: " + user;
    }

    /*
     * Edit the Donor Information who want to donate blood by passing ID
     * Pass Information such as Blood Group, Age
     */
    @PutMapping("/api/users/donate/{id}")
    public String editDonate(@RequestBody String user, @PathVariable String id) {
        return "User: " + id;
    }

    /*
     * Delete the Information of Donors who want to donate blood by passing ID
     */
    @DeleteMapping("/api/users/donate/{id}")
    public String deleteDonate(@PathVariable String id) {
        return "User: " + id;
    }

    /*
     * Get the Information of all the Donors
     * Get the Information of all the Donors who want to donate blood
     */
    @GetMapping("/api/users/donate")
    public ResponseEntity<String> Alldonations() {

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
     * GET the Information of the Donors by passing Email
     * 
     * @param id
     */
    @GetMapping("/api/users/donate/{Email}")
    public ResponseEntity<String> GetdonatebyEmail(@PathVariable String Email) {

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
     * Appointment Details of Users such as Center, Timing
     * Add the Appointment Details of Users in the Database
     */
    @PostMapping("/api/users/appointment")
    public String appointment(@RequestBody String user) {
        return "User: " + user;
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
    @DeleteMapping("/api/users/appointment/{id}")
    public String deleteAppointment(@PathVariable String id) {
        return "User: " + id;
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
     * GET the Appointment Details of Users by passing ID
     * Appointment details such as center, or timing
     */

    @GetMapping("/api/users/appointment/{id}")
    public String GetappointmentbyID(@PathVariable String id) {
        return "Appointment: " + id;
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
     * View Blood Requests entered by users by passing Email
     */
    @GetMapping("/api/users/bloodrequest/{Email}")
    public ResponseEntity<String> GetbloodrequestbyEmail(@PathVariable String Email) {

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

    @GetMapping("/api/Readtest")
    public void TestRead() {
        String ontologyURI = "http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system";
        String ontologyFile = "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl";
        Model model = ModelFactory.createDefaultModel();
        model.read(ontologyFile);

        // Create the SPARQL SELECT query

        String sparqlSelect = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <" + ontologyURI + "#>\n" +
                "SELECT ?person ?name\n" +
                "WHERE {\n" +
                "  ?person rdf:type bd:Person ;\n" +
                "          bd:name ?name .\n" +
                "}";

        // Execute the SPARQL SELECT query and print the results
        Query query = QueryFactory.create(sparqlSelect);
        try (QueryExecution qexec = QueryExecutionFactory.create(query, model)) {
            ResultSet results = qexec.execSelect();
            System.out.print("Results of Read Query: ");
            while (results.hasNext()) {
                QuerySolution soln = results.nextSolution();
                System.out.print(soln);
                RDFNode person = soln.get("person");
                RDFNode name = soln.get("hasName");
                System.out.println(person + " has name " + name);
            }
        }
    }

    /*
     * Test Method to check Insert Query
     */
    @GetMapping("/api/insert")
    public void Insert() throws IOException {
        InsertSparql();
        // Insert using UpdateAction
    }

    /*
     * Single Method for Read data using SPARQL Query
     * Query will passed as a parameter
     * Return the result in JSON format
     * Read data for all the routes
     */
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

    /**
     * @throws IOException
     * 
     */
    static void InsertSparql() throws IOException {
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
        // Query to insert donation centres data
        /*
         * String updateString =
         * "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
         * "PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>"
         * +
         * 
         * "INSERT DATA{" +
         * "bd:Center1 rdf:type bd:Blood_Donation_Center ." +
         * "bd:Center1 bd:hasCenterID '123' ." +
         * "bd:Center1 bd:hasCenterName 'Shukat Khanam' ." +
         * "bd:Center1 bd:hasCenterEmail 'shoukat@example.com' ." +
         * "}";
         * 
         * 
         * UpdateRequest updateRequest = UpdateFactory.create(updateString);
         * Dataset dataset = DatasetFactory.create(model);
         * UpdateProcessor updateProcessor =
         * UpdateExecutionFactory.create(updateRequest, dataset);
         * updateProcessor.execute();
         * 
         */
        // Create the SPARQL INSERT query
        String query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +

                "INSERT DATA {" +
                // Define the classes and their properties
                "bd:Person rdf:type rdfs:Class ." +
                "bd:hasName rdf:type rdf:Property ;" +
                "rdfs:domain bd:Person ;" +
                "rdfs:range xsd:string ." +

                // Define the individuals and their properties
                "bd:AbuHurariah rdf:type bd:Person ;" +
                "bd:hasName \"Abu  Hurairah\"^^xsd:string ." +
                "bd:AkashUrRehman rdf:type bd:Person ;" +
                "bd:hasName \"Akash Ur Rehman\"^^xsd:string ." +
                "}";

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
}