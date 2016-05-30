package ro.fmarket.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

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

}
