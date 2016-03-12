package ro.fmarket.core.validation.impl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import ro.fmarket.core.constants.ValidationConstants;
import ro.fmarket.core.validation.api.ValidPassword;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {
	
	@Override
	public void initialize(ValidPassword validPassword) {
	}

	@Override
	public boolean isValid(String password, ConstraintValidatorContext arg1) {
		if (password == null) {
			return true;
		}
		if (password.contains(" ")) {
			return false;
		}
		if (password.length() < ValidationConstants.PASSWORD_MIN_LENGTH) {
			return false;
		}
		if (password.length() > ValidationConstants.PASSWORD_MAX_LENGTH) {
			return false;
		}
		// contains digits
		if (!password.matches(".*\\d.*")) {
			return false;
		}
		if (!hasUppercaseLetter(password)) {
			return false;
		}
		if (!hasLowercaseLetter(password)) {
			return false;
		}
		return true;
	}

	/**
	 * Returns true if the given string contains at least one upper-case letter
	 * @param password
	 * @return
	 */
	private boolean hasUppercaseLetter(String password) {
		for (char c : password.toCharArray()) {
			if (Character.isUpperCase(c)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns true if the given string contains at least one lowercase letter
	 * @param password not null
	 * @return
	 */
	private boolean hasLowercaseLetter(String password) {
		for (char c : password.toCharArray()) {
			if (Character.isLowerCase(c)) {
				return true;
			}
		}
		return false;
	}
}
