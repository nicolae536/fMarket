package ro.fmarket.model.account;

import lombok.Data;

@Data
public class RegisterAccountRequest {

	private String email;
	
	private String password;
	
	private String passwordConfirm;
	
}
