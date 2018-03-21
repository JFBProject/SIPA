package com.cat.os.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.StringTemplateResolver;

import nz.net.ultraq.thymeleaf.LayoutDialect;

@Configuration
public class ThymleafConfiguration {

	@Autowired
	private ApplicationContext applicationContext;
	
	@Bean
	public SpringResourceTemplateResolver templateResolver(){
	    // SpringResourceTemplateResolver automatically integrates with Spring's own
	    // resource resolution infrastructure, which is highly recommended.
	    SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
	    templateResolver.setApplicationContext(this.applicationContext);
	    templateResolver.setPrefix("classpath:/templates/views/");
	    templateResolver.setSuffix(".html");
	    // HTML is the default value, added here for the sake of clarity.
	    templateResolver.setTemplateMode(TemplateMode.HTML);
	    // Template cache is true by default. Set to false if you want
	    // templates to be automatically updated when modified.
	    templateResolver.setCacheable(true);
	    return templateResolver;
	}
	
	@Bean
	public StringTemplateResolver emailTemplateResolver(){
	    // SpringResourceTemplateResolver automatically integrates with Spring's own
	    // resource resolution infrastructure, which is highly recommended.
	    StringTemplateResolver stringTemplateResolver = new StringTemplateResolver();
	    stringTemplateResolver.setCacheable(false);
	    stringTemplateResolver.setTemplateMode(TemplateMode.HTML);
	    return stringTemplateResolver;
	}
	
	@Bean("emailTemplateEngine")
	public SpringTemplateEngine emailTemplateEngine(){
	    // SpringTemplateEngine automatically applies SpringStandardDialect and
	    // enables Spring's own MessageSource message resolution mechanisms.
	    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
	    templateEngine.setTemplateResolver(emailTemplateResolver());
	    // Enabling the SpringEL compiler with Spring 4.2.4 or newer can
	    // speed up execution in most scenarios, but might be incompatible
	    // with specific cases when expressions in one template are reused
	    // across different data types, so this flag is "false" by default
	    // for safer backwards compatibility.
	    templateEngine.setEnableSpringELCompiler(true);
	    return templateEngine;
	}

	@Bean
	public SpringTemplateEngine templateEngine(){
	    // SpringTemplateEngine automatically applies SpringStandardDialect and
	    // enables Spring's own MessageSource message resolution mechanisms.
	    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
	    templateEngine.setTemplateResolver(templateResolver());
	    // Enabling the SpringEL compiler with Spring 4.2.4 or newer can
	    // speed up execution in most scenarios, but might be incompatible
	    // with specific cases when expressions in one template are reused
	    // across different data types, so this flag is "false" by default
	    // for safer backwards compatibility.
	    templateEngine.setEnableSpringELCompiler(true);
	    templateEngine.addDialect(layoutDialect());
//	    templateEngine.addDialect(securityDialect());
	    
	    return templateEngine;
	}
	
	@Bean
	public ThymeleafViewResolver viewResolver(){
	    ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
	    viewResolver.setTemplateEngine(templateEngine());
	    // NOTE 'order' and 'viewNames' are optional
	    viewResolver.setOrder(1);
	    viewResolver.setViewNames(new String[] {".html", ".xhtml"});
	    return viewResolver;
	}
	
	@Bean
	public LayoutDialect layoutDialect() {
	    return new LayoutDialect();
	}
	
//	@Bean
//	public SpringSecurityDialect securityDialect() {
//		return new SpringSecurityDialect();
//	}
	
} 
