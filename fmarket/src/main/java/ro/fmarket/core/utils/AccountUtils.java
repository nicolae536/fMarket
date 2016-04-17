package ro.fmarket.core.utils;

import ro.fmarket.core.exception.SuspendedAccountException;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.consts.AccountStatus;

public class AccountUtils {

	public static void validateAccountIsNotClosed(Account account) throws SuspendedAccountException {
		if (AccountStatus.CLOSED.equals(account.getStatus())) {
			throw new SuspendedAccountException("Account is closed");
		}
	}
	
}
