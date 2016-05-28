package ro.fmarket.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@ConfigurationProperties(prefix = "hikari")
public class DatabaseConfig extends HikariConfig {

	@Bean(destroyMethod = "close")
	@Primary
	public DataSource getDataSourceBean() {
		return new HikariDataSource(this);
	}
	
//	@Bean
	public HibernateTransactionManager getBean() {
		HibernateTransactionManager manager = new HibernateTransactionManager();
//		manager.setDataSource(getDataSourceBean());
		return manager;
	}
}
