package ro.fmarket.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import ro.fmarket.model.account.AccountService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
//		.eraseCredentials(true)
		.userDetailsService(accountService).passwordEncoder(passwordEncoder);
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
	     web.ignoring()
	        .antMatchers("/resources");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/app/pages/adminPage/**", "/admin/**").hasRole("ADMIN")
				.antMatchers("/app/pages/accountSettingsPage/**").hasRole("USER")
				.antMatchers("/app/**", "/", "/login").permitAll()
				.anyRequest().authenticated().and()
		         .formLogin()
		         	.successHandler(new RestAuthenticationSuccessHandler(new SavedRequestAwareAuthenticationSuccessHandler()))
		         	.failureHandler(new RestAuthenticationFailureHandler(new SimpleUrlAuthenticationFailureHandler()))
		             .and()
		         .exceptionHandling()
//		             .authenticationEntryPoint(restAuthenticationEntryPoint)
		             .and()
		         .logout()
		         	.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
		         	.and()
			.csrf().disable();
	}

}
