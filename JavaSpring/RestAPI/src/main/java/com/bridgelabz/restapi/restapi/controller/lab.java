package com.bridgelabz.restapi.restapi.controller;

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
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.update.UpdateAction;
import org.apache.jena.update.UpdateFactory;
import org.apache.jena.update.UpdateRequest;
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

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

@RestController
public class lab {

    /*
     * Managed by Akash Ur Rehman
     * Last Updated on 24/03/2020 11:00 PM
     * All Routes are added for FRs
     * No Hard Coded Data
     * Pass Data in Json format for POST AND PUT Requests
     */

    /*
     * Add the New report in the Database
     */
    @PostMapping("/api/lab/addReport")
    public String addReport(@RequestBody String Report) {
        return "Report" + Report;
    }

    /*
     * Edit the Report in the Database
     * Passing the new data in the body of the Request
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
     * Get ALL LABS
     */
    @GetMapping("/api/labs/RegisteredLabs")
    public ResponseEntity<String> AllLabs() {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +

                "SELECT * WHERE {" +
                "?labs rdf:type bd:Lab ." +
                "?labs bd:hasLabID ?ID ." +
                "?labs bd:hasLabName ?Name ." +
                "?labs bd:hasLabEmail ?Email ." +
                "?labs bd:hasLabContactNo ?ContactNo ." +
                "?labs bd:hasLabAddress ?Address ." +
                "?labs bd:hasLabCity ?City ." +
                "}";

        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = ReadSparqlMethod(queryString);

        // Check if Data is Found
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
     * New Lab Added
     */
    @PostMapping("/api/lab/registered/add")
    public ResponseEntity<String> AddLabDetails(@BodyRequest String LabData) throws IOException {
        /*
         * String name = "Kinza Lab";
         * String city = "Lahore";
         * String address = "Gulberg, Main Road, Lahore";
         * String contactNo = "+9245625896";
         * String email = "kinza@email.com";
         */

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(LabData);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;

        String individualId = "Lab_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        "bd:" + individualId + " rdf:type bd:Lab ;\n" +
                        "                       bd:hasLabName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabCity \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabAddress \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabID \"%s\"^^xsd:string ;\n" +
                        "}",
                name, city, address, contactNo, email, individualId);
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
     * Route to edit the registered labs details
     * Passing the new data in the body of the request
     */
    @PutMapping("/api/lab/RegisteredLabs/edit/{ID}")
    public String EditRegisteredLabs(@PathVariable String ID, @RequestBody String LabData) throws IOException {
        /*
         * String name = "Kinza Lab";
         * String city = "Lahore";
         * String address = "Gulberg, Main Road, Lahore";
         * String contactNo = "+9245625896";
         * String email = "kinza@email.com";
         */

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(LabData);

        String name = jsonNode.has("name") ? jsonNode.get("name").asText() : null;
        String city = jsonNode.has("city") ? jsonNode.get("city").asText() : null;
        String address = jsonNode.has("address") ? jsonNode.get("address").asText() : null;
        String contactNo = jsonNode.has("contactNo") ? jsonNode.get("contactNo").asText() : null;
        String email = jsonNode.has("email") ? jsonNode.get("email").asText() : null;
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                "DELETE {?lab bd:hasLabContactNo ?ContactNo ." +
                "?lab bd:hasLabCity ?City ." +
                "?lab bd:hasLabEmail ?Email ." +
                "?lab bd:hasLabName ?Name ." +
                "?lab bd:hasLabAddress ?Address ." +
                "INSERT { ?lab bd:hasLabContactNo \"" + contactNo + "\"^^xsd:string ." +
                " ?lab bd:hasLabCity \"" + city + "\"^^xsd:string ." +
                " ?lab bd:hasLabEmail \"" + email + "\"^^xsd:string ." +
                " ?lab bd:hasLabName \"" + name + "\"^^xsd:string ." +
                " ?lab bd:hasLabAddress \"" + address + "\"^^xsd:string ." +
                "WHERE { ?lab rdf:type bd:Lab ." +
                "?lab bd:hasLabContactNo ?ContactNo ." +
                "?lab bd:hasLabName ?Name ." +
                "?lab bd:hasLabCity ?City ." +
                "?lab bd:hasLabEmail ?Email ." +
                "?lab bd:hasLabAddress ?Address ." +
                "?lab bd:hasLabID ?ID ." +
                "filter(?ID = \"" + ID + "\")" +
                "}";
        UpdateSparql(queryString);

        return "Edit Lab Data" + LabData;
    }

    @DeleteMapping("/api/lab/RegisteredLabs/delete/{id}")
    public String DeleteLabDetails(@PathVariable String id) throws IOException {

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                "DELETE WHERE {\n" +
                "  ?individual rdf:type bd:Lab ;\n" +
                "                            bd:hasLabID \"" + id + "\" ;" +
                "}";

        // Call the InsertSparql function with the query
        DeleteSparql(queryString);

        // Return a success message
        return "Delete Sparql QUery runs successfully";
    }

    static boolean InsertSparql(String query) throws IOException {
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
        try {
            // Create the update execution object and execute the query
            UpdateAction.parseExecute(query, model);

            // Print the updated model
            System.out.println("Updated model:");

            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(
                    "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;
        } catch (Exception e) {
            System.out.println("Error in Insert Sparql");
            return false;
        }

    }

    static String ReadSparqlMethod(String queryString) {

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
    static boolean DeleteSparql(String query) throws IOException {
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
        try {
            // Create a UpdateRequest object
            UpdateRequest updateRequest = UpdateFactory.create(query);

            // Create a QueryExecution object and execute the query on the model
            UpdateAction.execute(updateRequest, model);
            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(
                    "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /* Method for Funtionality of Updating Data using sparql query */
    static boolean UpdateSparql(String queryString) throws IOException {
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
        try {
            // Create the update execution object and execute the query
            UpdateAction.parseExecute(queryString, model);

            // Print the updated model
            System.out.printf("Updated model:", model);

            // Write the updated model to a file
            FileOutputStream out = new FileOutputStream(
                    "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl");
            model.write(out, "RDF/XML-ABBREV");
            out.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
