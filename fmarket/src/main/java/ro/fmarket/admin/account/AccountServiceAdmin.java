package ro.fmarket.admin.account;

import java.util.List;

public interface AccountServiceAdmin {

	List<AccountDTO> getAccounts();
	
	void deleteAccount(Integer accountId);
	
	void createAccount(NewAccountRequest request);
	
	void updateAccount(Integer accountId, NewAccountRequest request);
}
