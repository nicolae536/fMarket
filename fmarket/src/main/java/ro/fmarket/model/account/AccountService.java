package ro.fmarket.model.account;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import ro.fmarket.model.account.details.AccountDetailsDTO;

public interface AccountService extends UserDetailsService {
	
	void requestPasswordChange(String email, String newPassword, boolean isLoggedIn);
	
	void requestPasswordChange(Account account, String newPassword);
	
	UserDetails getUserDetails(String email);
	
	void changePasswordForAuthenticatedUser(String email, String oldPassword, String newPassword);
	
	void setSubscription(String email, boolean subscription);
	
	void updateAccount(int accountId, UpdateAccountRequest request);
	
	AccountDetailsDTO getAccountDetails(int accountId);
}
