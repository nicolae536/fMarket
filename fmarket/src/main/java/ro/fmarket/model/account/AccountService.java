package ro.fmarket.model.account;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
	
	void changeAccountPassword(String email, String newPassword, boolean isLoggedIn);
	
	void changeAccountPassword(Account account, String newPassword);
}
