package ro.fmarket.model.confirmation;

import ro.fmarket.core.exception.InvalidTokenException;

public interface ConfirmationService {

	void confirmRegistration(String token) throws InvalidTokenException;

	void confirmPasswordChange(String token) throws InvalidTokenException;

	void confirmDemandCreation(String token) throws InvalidTokenException;
}
