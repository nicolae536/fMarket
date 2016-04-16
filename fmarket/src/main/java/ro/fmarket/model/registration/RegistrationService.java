package ro.fmarket.model.registration;

import ro.fmarket.model.account.Account;

public interface RegistrationService {

	void registerAccount(NewAccountRequest request);
	
	Account registerAutoAccount(String email);
	
}
