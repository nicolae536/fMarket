package ro.fmarket.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import ro.fmarket.model.account.AccountService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
				// .eraseCredentials(true)
				.userDetailsService(accountService).passwordEncoder(passwordEncoder);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.authorizeRequests()             //TODO -> change this to restrict everything for production since the script will be only one file
				.antMatchers("/test/**").permitAll()
		        .antMatchers("/**/*.js").permitAll()
				.antMatchers("/admin/**").hasAuthority("ADMIN")
		        .antMatchers("/app/pages/accountSettingsPage/**").hasAuthority("USER")
		        .antMatchers("/app/**", "/", "/login", "/accounts/user").permitAll()		        
				.anyRequest().permitAll()
				.and()
			.formLogin()
				.successHandler(new RestAuthenticationSuccessHandler(new SavedRequestAwareAuthenticationSuccessHandler()))
				.failureHandler(new RestAuthenticationFailureHandler(new SimpleUrlAuthenticationFailureHandler())).and().exceptionHandling()
				.authenticationEntryPoint(restAuthenticationEntryPoint)
				.and()
			.logout()
				.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
				.and()
			.sessionManagement().maximumSessions(5).sessionRegistry(sessionRegistry());
		
	}
	
	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}

	@Bean
	public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
		return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
	}

}
