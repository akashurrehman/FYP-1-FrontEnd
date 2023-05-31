package com.bridgelabz.restapi.restapi.controller;

import org.springframework.http.ResponseEntity;
import java.io.*;
import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
// import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
// import org.apache.jena.sparql.function.library.e;
// import org.apache.jena.update.UpdateAction;
// import org.apache.jena.update.UpdateFactory;
// import org.apache.jena.update.UpdateRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
/* import java.util.HashSet;
import java.util.Set;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.Claims;
//import for password encryption */
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/* 
 * *****بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ*****
 *
 * Author:  
 * 
 * Create JWT token for "Authentication Functionality" for our blood donation website
 * Full Stack Developer implementation
 * 
*/

@RestController
public class Auth {

    // Path for Ontology file
    public static final String ONTOLOGY_FILE_LOCAL_PATH = "D:/Akash/Semester 7/Final Year Project/Front_End_Implementation/FYP-1-FrontEnd/JavaSpring/RestAPI/src/main/resources/data/blood_donation_system.owl";

    // String secret = "mySecretKey";
    // Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String secretKey = "secret-key-for-jwt-token-encryption-mySecretKey";
    private final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

    public static String ROLE = "USER";

    Date now = new Date();
    Date expiration = new Date(now.getTime() + 86400000); // 1 day in milliseconds

    /*
     * Make login authentication request
     */
    @PostMapping("/user/auth/login")
    public ResponseEntity<String> Login(@RequestBody String Login) throws IOException {

        System.out.print(Login);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(Login);

        String username = jsonNode.has("username") ? jsonNode.get("username").asText() : null;
        String password = jsonNode.has("password") ? jsonNode.get("password").asText() : null;

        String queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX bd: <http://www.semanticweb.org/mabuh/ontologies/2023/blood_donation_system#>" +
                "SELECT * WHERE {" +
                "{ " +
                "?person rdf:type bd:Person ." +
                "?person bd:hasPersonID ?ID ." +
                "?person bd:hasUserName ?UserName ." +
                "?person bd:hasPassword ?Password ." +
                "?person bd:hasRole ?Role ." +
                "filter(?UserName = \"" + username + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?admin rdf:type bd:Admin ." +
                "?admin bd:hasAdminID ?ID ." +
                "?admin bd:hasUserName ?UserName ." +
                "?admin bd:hasPassword ?Password ." +
                "?admin bd:hasRole ?Role ." +
                "filter(?UserName = \"" + username + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?centre rdf:type bd:Blood_Donation_Centre ." +
                "?centre bd:hasCentreID ?ID ." +
                "?centre bd:hasUserName ?UserName ." +
                "?centre bd:hasPassword ?Password ." +
                "?centre bd:hasRole ?Role ." +
                "filter(?UserName = \"" + username + "\")" +
                "}" +
                "UNION" +
                "{ " +
                "?lab rdf:type bd:Lab ." +
                "?lab bd:hasLabID ?ID ." +
                "?lab bd:hasUserName ?UserName ." +
                "?lab bd:hasPassword ?Password ." +
                "?lab bd:hasRole ?Role ." +
                "filter(?UserName = \"" + username + "\")" +
                "}" +
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
            // Check if password not match value
            System.out.println("User not found");

            String errorMessage = "{\"error\": \"User not found, Please registered yourself!\"}";
            return new ResponseEntity<String>(errorMessage, headers, HttpStatus.NOT_FOUND);
        }

        if (!bindingsArr.isEmpty()) {

            String p = bindingsArr.getJSONObject(0).get("Password").toString();
            String r = bindingsArr.getJSONObject(0).get("Role").toString();
            String id = bindingsArr.getJSONObject(0).get("ID").toString();
            String name = bindingsArr.getJSONObject(0).get("UserName").toString();

            String json1 = p;
            String json2 = r;
            String json3 = id;
            String json4 = name;

            try {
                JSONObject jsonObject1 = new JSONObject(json1);
                JSONObject jsonObject2 = new JSONObject(json2);
                JSONObject jsonObject3 = new JSONObject(json3);
                JSONObject jsonObject4 = new JSONObject(json4);

                String password_value = jsonObject1.getString("value");
                String role_value = jsonObject2.getString("value");
                String id_value = jsonObject3.getString("value");
                String name_value = jsonObject4.getString("value");

                // System.out.println(role_value);
                // System.out.println(password_value);
                // System.out.println(id_value);

                // For password decryption and check user login password with database password
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                boolean isMatch = encoder.matches(password, password_value);

                if (isMatch) {
                    ROLE = role_value;
                    // Build the JWT token using the Key object
                    String token = Jwts.builder()
                            .setSubject(role_value)
                            .claim("role", role_value)
                            .claim("id", id_value)
                            .claim("name", name_value)
                            .setExpiration(expiration)
                            .signWith(key)
                            .compact();

                    // Check token value
                    System.out.println("Token: " + token);
                    System.out.println("Key: " + key);

                    // return ResponseEntity.ok(token);
                    return ResponseEntity.ok()
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                            .build();

                }

                else {
                    // Check if password not match value
                    System.out.println("Wrong Password entered by User");

                    String errorMessage = "{\"error\": \"Wrong Password!\"}";
                    return new ResponseEntity<String>(errorMessage, headers, HttpStatus.UNAUTHORIZED);
                }

            } catch (JSONException e) {
                // Handle the exception if the JSON is invalid or cannot be parsed
            }
        }

        // create the response object with the JSON result and headers
        return new ResponseEntity<String>(result, HttpStatus.OK);

    }

    /*
     * Make logout request
     */
    @GetMapping("/user/logout")
    public ResponseEntity<String> Logout(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // create new token with expired expiration time
        }
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "");
        return new ResponseEntity<>("Logout successful", headers, HttpStatus.OK);
    }

    /*
     * Method for the Functionality of Read data on the basis of query
     */
    static String ReadSparqlMethod(String queryString) {

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
