package ro.fmarket.model.confirmation;

import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.core.rest.LoginResponse;

public interface ConfirmationService {

	LoginResponse confirmRegistration(String token) throws InvalidTokenException;

	LoginResponse confirmPasswordChange(String token) throws InvalidTokenException;

	LoginResponse confirmDemandCreation(String token) throws InvalidTokenException;
}
