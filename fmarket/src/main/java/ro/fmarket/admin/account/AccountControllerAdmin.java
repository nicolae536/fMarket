package ro.fmarket.admin.account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/accounts")
public class AccountControllerAdmin {

	@Autowired
	private AccountServiceAdmin accountService;

	@RequestMapping(method = RequestMethod.GET)
	public List<AccountDTO> getList() {
		return accountService.getAccounts();
	}

	@RequestMapping(method = RequestMethod.POST)
	public void createAccount(@RequestBody NewAccountRequest request) {

	}

	@RequestMapping(value="/{id}",method = RequestMethod.PUT)
	public void updateAccount(@PathVariable("id") Integer id, @RequestBody NewAccountRequest request) {

	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteAccount(@PathVariable("id") Integer id) {
		accountService.deleteAccount(id);
	}

	

}
