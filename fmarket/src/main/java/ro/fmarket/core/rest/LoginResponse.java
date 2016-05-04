package ro.fmarket.core.rest;

import lombok.Data;
import ro.fmarket.model.account.consts.AccountType;

@Data
public class LoginResponse {

	private String email;
	
	private String accountType;
	
}
