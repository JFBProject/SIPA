package com.cat.os.config.email;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
@ConditionalOnProperty("os.ussd.email.enable")
public class UssdEmailConfig {
	
	private static final Logger log = LoggerFactory.getLogger(UssdEmailConfig.class);

	@Value("${os.ussd.email.host}")
	private String host;
	@Value("${os.ussd.email.port}")
	private Integer port;
	@Value("${os.ussd.email.user}")
	private String user;
	@Value("${os.ussd.email.pass}")
	private String pass;
			
	@PostConstruct
	public void init(){
		log.info("### UssdEmailConfig ####");
		log.info("### HOST : " + host);
		log.info("### PORT : " + port);
	}
	
	
	@Bean("ussdEmailServer")
	public JavaMailSenderImpl ussdEmailServer() {
		JavaMailSenderImpl javaImpl = new JavaMailSenderImpl ();
		javaImpl.setHost(host);
		javaImpl.setPort(port);
		javaImpl.setUsername(user);
		javaImpl.setPassword(pass);
		return javaImpl;
	}
}
