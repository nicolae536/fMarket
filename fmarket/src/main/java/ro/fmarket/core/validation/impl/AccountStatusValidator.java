package ro.fmarket.core.validation.impl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.log4j.Logger;

import ro.fmarket.core.validation.api.ValidAccountStatus;
import ro.fmarket.model.account.consts.AccountStatus;

public class AccountStatusValidator implements ConstraintValidator<ValidAccountStatus, String> {

	private static final Logger LOG = Logger.getLogger(AccountStatusValidator.class);
	
	@Override
	public void initialize(ValidAccountStatus validAccountStatus) {
	}

	@Override
	public boolean isValid(String status, ConstraintValidatorContext arg1) {
		try {
			AccountStatus.valueOf(status.toUpperCase());
		} catch (IllegalArgumentException | NullPointerException e) {
			LOG.info("Account status: " + status + " is not a valid one");
			return false;
		}
		return true;
	}

}
