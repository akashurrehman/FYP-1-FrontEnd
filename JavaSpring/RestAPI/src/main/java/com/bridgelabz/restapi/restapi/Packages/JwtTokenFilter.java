package com.bridgelabz.restapi.restapi.Packages;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;

import java.util.Collections;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

/* 
 * *****بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ*****
 *
 * Author:  
 * 
 * Get and decode JWT token for "Authorization Functionality" for our blood donation website
 * Full Stack Developer implementation
 * 
*/


public class JwtTokenFilter extends OncePerRequestFilter {

    private final String secretKey = "secret-key-for-jwt-token-encryption-mySecretKey";
    private final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

    public static String ROLE;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            System.out.println(authorizationHeader);
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = authorizationHeader.substring(7);

        try {
            System.out.println(jwtToken);
            System.out.println(key);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
                    System.out.println(claims);
            // Check if token is valid and authorized user
            if (claims.get("id") != null && claims.get("role").equals("USER")) {
                //ROLE = "USER";
                // Authorized user, continue with the request
                // Set the role in the security context
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(claims.get("id"), null, 
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")))
                );
                filterChain.doFilter(request, response);
            }
            else if (claims.get("id") != null && claims.get("role").equals("ADMIN")) {
                //ROLE = "USER";
                // Authorized user, continue with the request
                // Set the role in the security context
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(claims.get("id"), null, 
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")))
                );
                filterChain.doFilter(request, response);
            }
            else if (claims.get("id") != null && claims.get("role").equals("CENTRE")) {
                //ROLE = "USER";
                // Authorized user, continue with the request
                // Set the role in the security context
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(claims.get("id"), null, 
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_CENTRE")))
                );
                filterChain.doFilter(request, response);
            } 
            else if (claims.get("id") != null && claims.get("role").equals("LAB")) {
                //ROLE = "USER";
                // Authorized user, continue with the request
                // Set the role in the security context
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(claims.get("id"), null, 
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_LAB")))
                );
                filterChain.doFilter(request, response);
            } 
            else {
                // Unauthorized user, send 403 response
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        } catch (Exception e) {
            // Invalid token, send 401 response
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    }

}
