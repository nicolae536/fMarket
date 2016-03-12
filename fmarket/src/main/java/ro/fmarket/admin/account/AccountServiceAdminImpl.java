package ro.fmarket.admin.account;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.AccountConverter;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;

@Service
@Transactional
public class AccountServiceAdminImpl implements AccountServiceAdmin {

	@Autowired
	private AccountDao accountDao;

	@Override
	public List<AccountDTO> getAccounts() {
		final List<AccountDTO> result = new ArrayList<>();
		List<Account> list = accountDao.getList();
		for (Account a : list) {
			result.add(AccountConverter.toDTO(a));
		}
		return result;
	}

	@Override
	public void deleteAccount(Integer accountId) {
		accountDao.deleteById(accountId);

	}

	@Override
	public void createAccount(NewAccountRequest request) {
		final Account account = new Account();
		
		accountDao.save(account);

	}

	@Override
	public void updateAccount(Integer accountId, NewAccountRequest request) {
		final Account account = accountDao.get(accountId);
		fillAccountFields(account, request);
		accountDao.update(account);
	}

	private void fillAccountFields(Account account, NewAccountRequest request) {
		AccountDetails accountDetails = account.getAccountDetails();
		AccountHistoricalInfo historicalInfo = account.getHistoricalInfo();
		
		
	}

}
