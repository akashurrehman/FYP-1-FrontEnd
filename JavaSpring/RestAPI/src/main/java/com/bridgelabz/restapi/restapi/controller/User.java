package com.bridgelabz.restapi.restapi.controller;

import java.io.*;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
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
//import org.apache.jena.update.UpdateProcessor;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.ModelFactory;
//import org.apache.jena.update.UpdateExecutionFactory;
//import org.apache.jena.update.UpdateFactory;
//import org.apache.jena.update.UpdateRequest;
//import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
public class User {

    // get request mapping with query parameter
    @GetMapping("/helloParam")
    public ResponseEntity<String> sparqlMethodString() {
        System.out.print(SparqlTest());
        // set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String result = SparqlTest();
        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);
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

    // Pull Request for Insert Query
    static String SparqlTest() {

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
        /*
         * String updateString =
         * "PREFIX ex: <http://example.com/> INSERT DATA { ex:John ex:hasAge \"25\"^^xsd:int . }"
         * ;
         * UpdateRequest updateRequest = UpdateFactory.create(updateString);
         * Dataset dataset = DatasetFactory.create(model);
         * UpdateProcessor updateProcessor =
         * UpdateExecutionFactory.create(updateRequest, dataset);
         * updateProcessor.execute();
         */

        // create a SPARQL query
        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>" +

                "SELECT ?persons ?id ?name ?email WHERE {" +
                "?persons rdf:type bd:Person ." +
                "?persons bd:hasPersonID ?id ." +
                "?persons bd:hasPersonFullName ?name ." +
                "?persons bd:hasPersonEmail ?email ." +
                "}";

        Query query = QueryFactory.create(queryString);

        // execute the query and print the results
        try (QueryExecution qe = QueryExecutionFactory.create(query, model)) {
            ResultSet results = qe.execSelect();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ResultSetFormatter.outputAsJSON(outputStream, results);
            String jsonResult = outputStream.toString();
            return jsonResult;
        }
    }
}