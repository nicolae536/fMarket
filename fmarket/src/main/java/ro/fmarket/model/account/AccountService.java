package ro.fmarket.model.account;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.model.account.details.AccountDetailsDTO;

public interface AccountService extends UserDetailsService {
	
	void requestPasswordChange(String email, String newPassword);
	
	void requestPasswordChange(Account account, String newPassword);
	
	UserDetails getUserDetails(String email);
	
	void changePasswordForAuthenticatedUser(String email, String oldPassword, String newPassword);
	
	void setSubscription(String email, boolean subscription);
	
	void updateAccount(int accountId, UpdateAccountRequest request);
	
	AccountDetailsDTO getAccountDetails(int accountId);
	
	Account getByDemandTokenAccess(String token) throws InvalidTokenException;
	
	void updateAccountLastLogin(String email, boolean isAuto);
}
