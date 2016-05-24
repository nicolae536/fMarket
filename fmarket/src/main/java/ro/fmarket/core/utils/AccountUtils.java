package ro.fmarket.core.utils;

import ro.fmarket.core.exception.ClosedAccountException;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.consts.AccountStatus;

public class AccountUtils {

	public static void validateAccountIsNotClosed(Account account) throws ClosedAccountException {
		if (AccountStatus.CLOSED.equals(account.getStatus())) {
			throw new ClosedAccountException("Account is closed");
		}
	}
	
}
