package ro.fmarket.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import ro.fmarket.model.account.AccountService;

@Component
public class SecurityUtils {
	
    @Autowired
    private AccountService accountService;
	
	public void authenticateUser(String email) {
		final SecurityContext context = SecurityContextHolder.getContext();
		if (context.getAuthentication() instanceof AnonymousAuthenticationToken) {
			final UserDetails userDetails = accountService.getUserDetails(email);
			final Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			context.setAuthentication(authentication);
		}
	}
}
