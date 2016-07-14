package ro.fmarket.core.rest;

import lombok.Data;

@Data
public class LoginResponse {

	private boolean isLoggedIn;
	
	private String email;
	
	private String accountType;
	
}
