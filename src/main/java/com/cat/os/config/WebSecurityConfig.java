//package com.cat.os.config;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.cat.os.config.security.CatLdapAuthenticationProvider;
//import com.cat.os.config.security.CustomUserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
//	
//	private static final Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);
//
//	
//	@Autowired
//	private CustomUserDetailsService customUserDetailsService;
//	
//	 @Override
//	    protected void configure(HttpSecurity http) throws Exception {
//	        http
//	            .authorizeRequests()
//	                .antMatchers("/theme/**","/login","/ws-api/**").permitAll()
//	                .anyRequest().authenticated()
//	                .and()
//	            .formLogin()
//	                .loginPage("/login").defaultSuccessUrl("/home", true)
//	                .permitAll()
//	                .and()
//	            .logout()
//	                .permitAll();
//	        
//	        //disable csrf() for cfx
//	        http.csrf().disable();
//	    }
//
//	    @Autowired
//	    public void configureGlobal(AuthenticationManagerBuilder auth , AuthenticationProvider authenticationProvider) throws Exception {
//
//	    	auth.authenticationProvider(authenticationProvider);
//	    }
//	    
//	    @Bean
//	    @ConditionalOnProperty(name="ldap.cat.enable",havingValue="false" ,matchIfMissing=true)
//	    public DaoAuthenticationProvider authenticationProvider() {
//	    	log.info("@@ DaoAuthenticationProvider");
//	        DaoAuthenticationProvider authProvider  = new DaoAuthenticationProvider();
//	        authProvider.setUserDetailsService(customUserDetailsService);
//	        authProvider.setPasswordEncoder(encoder());
//	        return authProvider;
//	    }
//
//	    @Bean
//	    @ConditionalOnProperty(name="ldap.cat.enable",havingValue="true")
//	    public CatLdapAuthenticationProvider ldapAuthenticationProvider() {
//	    	log.info("@@ CatLdapAuthenticationProvider");
//	    	CatLdapAuthenticationProvider authProvider  = new CatLdapAuthenticationProvider();
//	    	authProvider.setUserDetailsService(customUserDetailsService);
//	    	return authProvider;
//	    }
//	     
//	    @Bean
//	    public PasswordEncoder encoder() {
//	        return new BCryptPasswordEncoder(11);
//	    }
//}
