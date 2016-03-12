package ro.fmarket.core.validation.impl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.apache.log4j.Logger;

import ro.fmarket.core.validation.api.ValidAccountType;
import ro.fmarket.model.account.consts.AccountType;

public class AccountTypeValidator implements ConstraintValidator<ValidAccountType, String> {

	private static final Logger LOG = Logger.getLogger(AccountTypeValidator.class);

	@Override
	public void initialize(ValidAccountType validAccountType) {
	}

	@Override
	public boolean isValid(String type, ConstraintValidatorContext arg1) {
		try {
			AccountType.valueOf(type.toUpperCase());
		} catch (IllegalArgumentException | NullPointerException e) {
			LOG.info("Account type: '" + type + "' is not a valid one");
			return false;
		}
		return true;
	}

}
