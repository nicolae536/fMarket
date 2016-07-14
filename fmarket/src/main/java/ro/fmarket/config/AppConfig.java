package ro.fmarket.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan("ro.fmarket")
@EntityScan("ro.fmarket")
@EnableAsync
@EnableConfigurationProperties
@EnableTransactionManagement
@EnableAspectJAutoProxy
public class AppConfig {

	@Bean
	public PasswordEncoder getPasswordEncoderBean() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean(name = "asyncExecutor")
	public TaskExecutor getAsyncTaskExecutor() {
		ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
	      taskExecutor.setMaxPoolSize(10);
	      taskExecutor.setCorePoolSize(5);
	      taskExecutor.setThreadNamePrefix("mailSenderExecutor-");
	      return taskExecutor;
	}
	
}
