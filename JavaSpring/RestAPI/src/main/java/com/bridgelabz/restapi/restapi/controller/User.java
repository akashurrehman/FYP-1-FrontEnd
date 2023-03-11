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

import com.bridgelabz.restapi.restapi.entity.Person;

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
import org.apache.jena.update.UpdateRequest;
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
    public String users() {
        return "All Registered Users";
    }

    /*
     * Route to Get Data of Single User by passing ID
     * ID is passed in the URL
     * Through ID we can find the User Information
     */
    @GetMapping("/api/users/registration/{id}")
    public String user(@PathVariable String id) {
        return "User: " + id;
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
    public String donate() {
        return "All Donors";
    }

    /*
     * GET the Information of the Donors by passing ID
     * 
     * @param id
     */
    @GetMapping("/api/users/donate/{id}")
    public String GetdonatebyID(@PathVariable String id) {
        return "Donor: " + id;
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
    public String bloodrequest() {
        return "All Blood Requests";
    }

    // get request mapping with query parameter
    @GetMapping("/helloParam")
    public ResponseEntity<String> sparqlMethodString() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>" +

                "SELECT ?centers ?id ?name ?email WHERE {" +
                "?centers rdf:type bd:Blood_Donation_Center ." +
                "?centers bd:hasCenterID ?id ." +
                "?centers bd:hasCenterName ?name ." +
                "?centers bd:hasCenterEmail ?email ." +
                "}";
        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @GetMapping("/api/insert")
    public void Insert() {
        InsertSparql();
        // Insert using UpdateAction
    }

    // get request mapping with path variable
    @GetMapping("/hello/{name}")
    public String sayHello(@PathVariable String name) {
        return "Hello " + name + " from Bridgelabz";
    }

    // get request mapping with request body
    @PostMapping("/hello/post")
    public String getFirstLastName(@RequestBody Person person) {
        return "Hello " + person.getFirstName() + " " + person.getLastName() + " from Bridgelabz";
    }

    // put request mapping with path variable and query parameter
    @PutMapping("/hello/put/{firstName}")
    public String sayHelloWithPut(@RequestParam String lastName, @PathVariable String firstName) {
        return "Hello " + firstName + " " + lastName + " from Bridgelabz";
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
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/Blood.xml");

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

    static void InsertSparql() {

        // create a file object for the RDF file
        File file = new File(
                "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/Blood.xml");

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
        // Query to insert donation centres data
        String updateString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>" +

                "INSERT DATA{" +
                "bd:Center1 rdf:type bd:Blood_Donation_Center ." +
                "bd:Center1 bd:hasCenterID '123' ." +
                "bd:Center1 bd:hasCenterName 'Shukat Khanam' ." +
                "bd:Center1 bd:hasCenterEmail 'shoukat@example.com' ." +
                "}";

        UpdateRequest updateRequest = UpdateFactory.create(updateString);
        Dataset dataset = DatasetFactory.create(model);
        UpdateProcessor updateProcessor = UpdateExecutionFactory.create(updateRequest, dataset);
        updateProcessor.execute();
    }
}