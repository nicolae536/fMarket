package ro.fmarket.core.converter;

import ro.fmarket.admin.account.AccountDTO;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;

public class AccountConverter {

	public static AccountDTO toDTO(Account account) {
		final AccountDTO r = new AccountDTO();
		r.setId(account.getId());
		r.setEmail(account.getEmail());
		final AccountDetails details = account.getAccountDetails();
		r.setCity(details.getCity() != null ? details.getCity().getName() : null);
		r.setName(details.getName());
		r.setStatus(account.getStatus().name());
		r.setType(account.getType().name());
		final AccountHistoricalInfo historicalInfo = account.getHistoricalInfo();
		r.setCreationDate(historicalInfo.getCreationDate());
		r.setClosedDate(historicalInfo.getClosedDate());
		r.setActivationDate(historicalInfo.getActivationDate());
		r.setAutoLoginTimes(historicalInfo.getAutoLoginTimes());
		r.setLoginTimes(historicalInfo.getLoginTimes());
		r.setLastAutoLoginDate(historicalInfo.getLastAutoLoginDate());
		r.setLastLoginDate(historicalInfo.getLastLoginDate());
		r.setLastPasswordChangeDate(historicalInfo.getLastPasswordChangeDate());
		return r;
	}

}
