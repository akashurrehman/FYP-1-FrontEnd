package com.bridgelabz.restapi.restapi;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/user/auth/login").permitAll()
            .antMatchers("/api/user/registration/add").permitAll()
            .antMatchers("/api/users/registration").permitAll()
            .antMatchers("/api/admin/getSponsor").permitAll()
            .antMatchers("/api/users/bloodrequest").permitAll()
            .antMatchers("/api/user/bloodRequest/BloodRequestDetails/update/{ID}").permitAll()
            .antMatchers("/api/admin/sponsor/SponsorDetails/update/{ID}").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .and()
            .logout()
            .logoutSuccessUrl("/login?logout")
            .and()
            .csrf().disable();
    }

    // You can configure user roles and credentials with an AuthenticationManagerBuilder
    // Here's an example with in-memory authentication:
    /*
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("admin").password("{noop}adminpass").roles("ADMIN")
            .and()
            .withUser("user").password("{noop}userpass").roles("USER");
    }
    */
}
