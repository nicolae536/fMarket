package ro.fmarket.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableAutoConfiguration
@ComponentScan("ro.fmarket")
@EntityScan("ro.fmarket")
@EnableTransactionManagement
public class AppConfig {

	// @Bean
	// public MappingJackson2HttpMessageCoOnverter getMessageConverter() {
	// MappingJackson2HttpMessageConverter result = new MappingJackson2HttpMessageConverter();
	// ObjectMapper objectMapper = new ObjectMapper();
	//// objectMapper.registerModule(new JodaModule());
	//// objectMapper.registerModule(new JtsModule());
	// result.setObjectMapper(objectMapper);
	// return result;
	// }

	@Bean
	public PasswordEncoder getPasswordEncoderBean() {
		return new BCryptPasswordEncoder();
	}

}
