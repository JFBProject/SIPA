package com.cat.os.config.db;

import java.sql.SQLException;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.cat.os.common.constant.ProjectConstant.TransactionManagerRef;
import com.cat.os.common.persistence.dao.CommonJdbcDao;
import com.cat.os.dao.entity.TableTest;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.cat.os.dao.mysql", entityManagerFactoryRef = "entityManagerFactory", transactionManagerRef = TransactionManagerRef.DEFAULT_MYSQL)
public class DataAccessConfig {
	
	private static final Logger log = LoggerFactory.getLogger(DataAccessConfig.class);
	
	@Bean
	@Primary
	@ConfigurationProperties("app.datasource")
	public DataSource dataSource() {
		log.info("@@ Cat Mysql DataAccessConfig...");
		return DataSourceBuilder.create().build();
	}
	
	@Bean
	@Primary
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder
			.dataSource(dataSource())
			.packages(
					TableTest.class
			)
			.persistenceUnit("system")
			.build();
	}
	
	@Primary
	@Bean(name = TransactionManagerRef.DEFAULT_MYSQL)
	public PlatformTransactionManager transactionManager(@Qualifier("entityManagerFactory") EntityManagerFactory  entityManagerFactory) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory);
		transactionManager.setDataSource(dataSource());
		return transactionManager;
	}
	
	@Primary
	@Bean(name = "systemJdbcTemplate")
	public JdbcTemplate systemJdbcTemplate() throws SQLException {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource());
		return jdbcTemplate;
	}
	
	@Primary
	@Bean(name = "systemCommonJdbcDao")
	public CommonJdbcDao commonJdbcDao(@Qualifier("systemJdbcTemplate") JdbcTemplate jdbcTemplate) {
		return new CommonJdbcDao(jdbcTemplate);
	}
	
}
