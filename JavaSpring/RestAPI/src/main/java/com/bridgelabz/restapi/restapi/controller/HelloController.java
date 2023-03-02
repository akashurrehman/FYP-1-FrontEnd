package com.bridgelabz.restapi.restapi.controller;

import java.io.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.restapi.restapi.entity.Person;

import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.query.ResultSetFormatter;
import org.apache.jena.rdf.model.ModelFactory;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Bridgelabz";
    }

    @GetMapping("/api/bloodCenter")
    public String center() {
        return "Blood Donation Center";
    }

    @GetMapping("/copy")
    public String copy() {
        return "Hello from Copy";
    }

    @GetMapping("/api/blood")
    public String blood() {
        return "Blood Group: A+";
    }

    // get request mapping with query parameter
    @GetMapping("/helloParam")
    public void sparqlMethodString() {
        SparqlTest();
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

    static void SparqlTest() {

        // create a file object for the RDF file
        File file = new File("D:/Final Year Project/FYP FrontEnd 2/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/Blood.xml");

        // create a model from the RDF file
        Model model = ModelFactory.createDefaultModel();
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            model.read(in, null);
        } catch (IOException e) {
            // handle the exception
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // handle the exception
                }
            }
        }

        // create a SPARQL query
        String queryString = 
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" + 
        "PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>" +
        "SELECT * WHERE { " + 
        "?users bd:userEnrollsIn bd:DONOR_Website " +
        "}" ;

        Query query = QueryFactory.create(queryString);

        // execute the query and print the results
        try (QueryExecution qe = QueryExecutionFactory.create(query, model)) {
            ResultSet results = qe.execSelect();
            ResultSetFormatter.out(System.out, results, query);
        }
    }
}