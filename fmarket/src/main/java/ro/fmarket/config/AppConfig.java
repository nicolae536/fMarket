package ro.fmarket.config;

import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan("ro.fmarket")
@EntityScan("ro.fmarket")
@EnableTransactionManagement
@EnableAsync
public class AppConfig {

	@Bean
	public PasswordEncoder getPasswordEncoderBean() {
		return new BCryptPasswordEncoder();
	}
	

}
