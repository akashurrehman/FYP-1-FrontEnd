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

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

@RestController
public class lab {
    // This lab class will returns the report record of the user if their report
    // available in the database
    // If the report is not available then it will return the message that the
    // report is not available
    // This class will also add the report of the user in the database
    // This class will also delete the report of the user in the database
    // This class will also update the report of the user in the database
    // This class will also get the report of the user in the database
    // This class will also get the report of the user in the database by ID
    // This class will also get the report of the user in the database by Name

    /*
     * Add the New report in the Database
     */
    @PostMapping("/api/lab/addReport")
    public String addReport(@RequestBody String Report) {
        return "Report" + Report;
    }

    /*
     * Edit the Report in the Database
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
     * Get the Report in the Database by Date
     */
    @GetMapping("/api/lab/getReport/{date}")
    public String getReportByDate(@PathVariable String date) {
        return "Report" + date;
    }

    /*
     * Get the Report in the Database by Time
     */
    @GetMapping("/api/lab/getReport/{time}")
    public String getReportByTime(@PathVariable String time) {
        return "Report" + time;
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
    public String AddLabDetails() throws IOException {

        String name = "Kinza Lab";
        String city = "Lahore";
        String address = "Gulberg, Main Road, Lahore";
        String contactNo = "+9245625896";
        String email = "kinza@email.com";

        String individualId = "bd:Lab_" + System.currentTimeMillis();
        String query = String.format(
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n\n" +
                        "INSERT DATA {\n" +
                        individualId + " rdf:type bd:Lab ;\n" +
                        "                       bd:hasLabName \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabCity \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabAddress \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabContactNo \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabEmail \"%s\"^^xsd:string ;\n" +
                        "                       bd:hasLabID \"%s\"^^xsd:string ;\n" +
                        "}",
                name, city, address, contactNo, email, individualId);

        // Call the InsertSparql function with the query
        InsertSparql(query);

        // Return a success message
        return "Insert Sparql QUery runs successfully";
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
