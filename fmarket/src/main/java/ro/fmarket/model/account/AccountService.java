package ro.fmarket.model.account;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
	
	void requestPasswordChange(String email, String newPassword, boolean isLoggedIn);
	
	void requestPasswordChange(Account account, String newPassword);
}
