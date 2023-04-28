package com.bridgelabz.restapi.restapi;

import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.beans.factory.annotation.Autowired;
// import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.bridgelabz.restapi.restapi.Packages.JwtTokenFilter;
import org.springframework.security.config.http.SessionCreationPolicy;

/* 
 * *****بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ*****
 *
 * Author:  
 * 
 * Make routes protected in "Authorization Functionality" for our blood donation website
 * Full Stack Developer implementation
 * 
*/

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // private JwtTokenFilter jwtTokenFilter;

    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        return new JwtTokenFilter();
    }

    /*
     * If you want to apply authorization then use given below function by just
     * removing the comments
     */

    // @Override
    // protected void configure(HttpSecurity http) throws Exception {
    // http.csrf().disable()
    // .authorizeRequests()
    // .antMatchers("/user/auth/login").permitAll()
    // .antMatchers("/user/logout").permitAll()

    // /************User Routes start here*************/
    // .antMatchers("/api/users/registration").hasRole("USER")
    // .antMatchers("/api/users/registration/{ID}").hasRole("USER")
    // .antMatchers("/api/user/registration/add").hasRole("USER")
    // .antMatchers("/api/users/edit/{ID}").hasRole("USER")
    // .antMatchers("/api/users/delete/{id}").hasRole("USER")

    // .antMatchers("/api/users/donate/addDonorInfo").hasRole("USER")
    // .antMatchers("/api/user/bloodDonors/Donors/update/{ID}").hasRole("USER")
    // .antMatchers("/api/user/deleteBloodDonation/bloodDonationDetails/delete/{id}").hasRole("USER")
    // .antMatchers("/api/users/donate").hasRole("USER")
    // .antMatchers("/api/users/donate/{ID}").hasRole("USER")

    // .antMatchers("/api/user/bloodRequest/BloodRequestDetails/add").hasRole("USER")
    // .antMatchers("/api/user/bloodRequest/BloodRequestDetails/update/{ID}").hasRole("USER")
    // .antMatchers("/api/user/bloodRequest/BloodRequestDetails/delete/{id}").hasRole("USER")
    // .antMatchers("/api/users/bloodrequest").hasRole("USER")
    // .antMatchers("/api/users/bloodrequest/{id}").hasRole("USER")

    // /************Blood Donation Centre Routes start here*************/
    // .antMatchers("/api/bloodCenter/RegisteredCenters").hasAnyRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/CenterRegistration/add").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/update/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/delete/{id}").hasRole("CENTRE")

    // .antMatchers("/api/user/bloodDonation/BloodDonationDetails/addUserInfo").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/deleteUserInfo/{id}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/editDonorInformations/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/getDonorInfo/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/getDonorInfo").hasRole("CENTRE")

    // .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{BloodGroup}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/add").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/delete/{id}").hasRole("CENTRE")

    // .antMatchers("/api/bloodCenter/RegisteredCenters/makeRequest").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/editRequest/{ID}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/deleteRequest/{id}").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/getRequest").hasRole("CENTRE")
    // .antMatchers("/api/bloodCenter/RegisteredCenters/getRequest/{ID}").hasRole("CENTRE")

    // /************Lab Routes start here*************/
    // .antMatchers("/api/lab/addReport").hasRole("LAB")
    // .antMatchers("/api/lab/editReport/{id}").hasRole("LAB")
    // .antMatchers("/api/lab/deleteReport/{id}").hasRole("LAB")
    // .antMatchers("/api/lab/getReport").hasRole("LAB")
    // .antMatchers("/api/lab/getReport/{id}").hasRole("LAB")
    // .antMatchers("/api/lab/getReport/{name}").hasRole("LAB")

    // .antMatchers("/api/labs/RegisteredLabs").hasRole("LAB")
    // .antMatchers("/api/lab/registered/add").hasRole("LAB")
    // .antMatchers("/api/lab/RegisteredLabs/edit/{ID}").hasRole("LAB")
    // .antMatchers("/api/lab/RegisteredLabs/delete/{id}").hasRole("LAB")

    // /************Admin Routes start here*************/
    // .antMatchers("/api/admin/getSponsor").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getSponsor/{id}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addSponsor").hasRole("ADMIN")
    // .antMatchers("/api/admin/sponsor/SponsorDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteSponsor/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getFinancialDonation").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getFinancialDonation/{Name}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addFinancialDonation").hasRole("ADMIN")
    // .antMatchers("/api/admin/financialDonation/financialDonationDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteFinancialDonation/financialDonationDetails/delete/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getJobPost").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getJobPost/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addJobPost").hasRole("ADMIN")
    // .antMatchers("/api/admin/jobPost/JobPostDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteJobPost/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getFAQ").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getFAQ/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addFAQ").hasRole("ADMIN")
    // .antMatchers("/api/admin/faq/FAQDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteFAQ/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getEnquiry").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getEnquiry/{id}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addEnquiry").hasRole("ADMIN")
    // .antMatchers("/api/admin/editEnquiry/{id}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteEnquiry/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getCompaigns").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getCompaigns/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addCompaigns").hasRole("ADMIN")
    // .antMatchers("/api/admin/campaign/CampaignDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteCompaigns/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getNews").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getNews/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addNews").hasRole("ADMIN")
    // .antMatchers("/api/admin/news/NewsDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteNews/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getAdvertisement").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getAdvertisement/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addAdvertisement").hasRole("ADMIN")
    // .antMatchers("/api/admin/advertisement/AdvertisementDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteAdvertisement/{id}").hasRole("ADMIN")

    // .antMatchers("/api/admin/getEvents").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/getEvents/{title}").hasAnyRole("ADMIN")
    // .antMatchers("/api/admin/addEvents").hasRole("ADMIN")
    // .antMatchers("/api/admin/event/eventDetails/update/{ID}").hasRole("ADMIN")
    // .antMatchers("/api/admin/deleteEvents/{id}").hasRole("ADMIN")

    // .anyRequest().authenticated()
    // .and()
    // .sessionManagement()
    // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    // .and()
    // .addFilterBefore(jwtTokenFilter(),
    // UsernamePasswordAuthenticationFilter.class)
    // .logout()
    // .logoutSuccessUrl("/user/auth/login?logout")
    // .invalidateHttpSession(true)
    // .deleteCookies("JSESSIONID");
    // }

    /*
     * If you don't want to apply authorization then use given below function and
     * when you want to apply
     * authorization just comment down the below code and remove commenting from
     * above code
     */

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/auth/login").permitAll()
                .antMatchers("/user/logout").permitAll()

                /************ User Routes start here *************/
                .antMatchers("/api/users/registration").permitAll()
                .antMatchers("/api/users/registration/{ID}").permitAll()
                .antMatchers("/api/user/registration/add").permitAll()
                .antMatchers("/api/users/edit/{ID}").permitAll()
                .antMatchers("/api/users/delete/{id}").permitAll()

                .antMatchers("/api/users/donate/addDonorInfo").permitAll()
                .antMatchers("/api/user/bloodDonors/Donors/update/{ID}").permitAll()
                .antMatchers("/api/user/deleteBloodDonation/bloodDonationDetails/delete/{id}").permitAll()
                .antMatchers("/api/users/donate").permitAll()
                .antMatchers("/api/users/donate/{ID}").permitAll()

                .antMatchers("/api/user/bloodRequest/BloodRequestDetails/add").permitAll()
                .antMatchers("/api/user/bloodRequest/BloodRequestDetails/update/{ID}").permitAll()
                .antMatchers("/api/user/bloodRequest/BloodRequestDetails/delete/{id}").permitAll()
                .antMatchers("/api/users/bloodrequest").permitAll()
                .antMatchers("/api/users/bloodrequest/{id}").permitAll()

                /************ Blood Donation Centre Routes start here *************/
                .antMatchers("/api/bloodCenter/RegisteredCenters").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/CenterRegistration/add").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/update/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/delete/{id}").permitAll()

                .antMatchers("/api/user/bloodDonation/BloodDonationDetails/addUserInfo").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/deleteUserInfo/{id}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/editDonorInformations/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/getDonorInfo/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/getDonorInfo").permitAll()

                .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{BloodGroup}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/add").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/bloodStockDetails/delete/{id}").permitAll()

                .antMatchers("/api/bloodCenter/RegisteredCenters/makeRequest").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/editRequest/{ID}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/deleteRequest/{id}").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/getRequest").permitAll()
                .antMatchers("/api/bloodCenter/RegisteredCenters/getRequest/{ID}").permitAll()

                /************ Lab Routes start here *************/
                .antMatchers("/api/lab/addReport").permitAll()
                .antMatchers("/api/lab/editReport/{id}").permitAll()
                .antMatchers("/api/lab/deleteReport/{id}").permitAll()
                .antMatchers("/api/lab/getReport").permitAll()
                .antMatchers("/api/lab/getReport/{id}").permitAll()
                .antMatchers("/api/lab/getReport/{name}").permitAll()

                .antMatchers("/api/labs/RegisteredLabs").permitAll()
                .antMatchers("/api/labs/RegisteredLabs/{id}").permitAll()
                .antMatchers("/api/lab/registered/add").permitAll()
                .antMatchers("/api/lab/RegisteredLabs/edit/{ID}").permitAll()
                .antMatchers("/api/lab/RegisteredLabs/delete/{id}").permitAll()

                /************ Admin Routes start here *************/
                .antMatchers("/api/admin/getSponsor").permitAll()
                .antMatchers("/api/admin/getSponsor/{id}").permitAll()
                .antMatchers("/api/admin/addSponsor").permitAll()
                .antMatchers("/api/admin/sponsor/SponsorDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteSponsor/{id}").permitAll()

                .antMatchers("/api/admin/getFinancialDonation").permitAll()
                .antMatchers("/api/admin/getFinancialDonation/{Name}").permitAll()
                .antMatchers("/api/admin/getFinancialDonationById/{id}").permitAll()
                .antMatchers("/api/admin/addFinancialDonation").permitAll()
                .antMatchers("/api/admin/financialDonation/financialDonationDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteFinancialDonation/financialDonationDetails/delete/{id}").permitAll()

                .antMatchers("/api/admin/getJobPost").permitAll()
                .antMatchers("/api/admin/getJobPost/{title}").permitAll()
                .antMatchers("/api/admin/getJobPostByID/{id}").permitAll()
                .antMatchers("/api/admin/addJobPost").permitAll()
                .antMatchers("/api/admin/jobPost/JobPostDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteJobPost/{id}").permitAll()

                .antMatchers("/api/admin/getFAQ").permitAll()
                .antMatchers("/api/admin/getFAQ/{title}").permitAll()
                .antMatchers("/api/admin/getFAQById/{id}").permitAll()
                .antMatchers("/api/admin/addFAQ").permitAll()
                .antMatchers("/api/admin/faq/FAQDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteFAQ/{id}").permitAll()

                .antMatchers("/api/admin/getEnquiry").permitAll()
                .antMatchers("/api/admin/getEnquiry/{id}").permitAll()
                .antMatchers("/api/admin/addEnquiry").permitAll()
                .antMatchers("/api/admin/editEnquiry/{id}").permitAll()
                .antMatchers("/api/admin/deleteEnquiry/{id}").permitAll()

                .antMatchers("/api/admin/getCompaigns").permitAll()
                .antMatchers("/api/admin/getCompaigns/{title}").permitAll()
                .antMatchers("/api/admin/getCompaignsById/{id}").permitAll()
                .antMatchers("/api/admin/addCompaigns").permitAll()
                .antMatchers("/api/admin/campaign/CampaignDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteCompaigns/{id}").permitAll()

                .antMatchers("/api/admin/getNews").permitAll()
                .antMatchers("/api/admin/getNews/{title}").permitAll()
                .antMatchers("/api/admin/getNewsById/{id}").permitAll()
                .antMatchers("/api/admin/addNews").permitAll()
                .antMatchers("/api/admin/news/NewsDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteNews/{id}").permitAll()

                .antMatchers("/api/admin/getAdvertisement").permitAll()
                .antMatchers("/api/admin/getAdvertisement/{title}").permitAll()
                .antMatchers("/api/admin/addAdvertisement").permitAll()
                .antMatchers("/api/admin/advertisement/AdvertisementDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteAdvertisement/{id}").permitAll()

                .antMatchers("/api/admin/getEvents").permitAll()
                .antMatchers("/api/admin/getEvents/{title}").permitAll()
                .antMatchers("/api/admin/getEventsById/{id}").permitAll()
                .antMatchers("/api/admin/addEvents").permitAll()
                .antMatchers("/api/admin/event/eventDetails/update/{ID}").permitAll()
                .antMatchers("/api/admin/deleteEvents/{id}").permitAll()

                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutSuccessUrl("/user/auth/login?logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
    }

    // You can configure user roles and credentials with an
    // AuthenticationManagerBuilder
    // Here's an example with in-memory authentication:
    // @Autowired
    // public void configureGlobal(AuthenticationManagerBuilder auth) throws
    // Exception {
    // auth.inMemoryAuthentication()
    // .withUser("faizan123").password("12345678user").roles("USER");
    // }

}
