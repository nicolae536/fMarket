package ro.fmarket.admin.account;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidAccountStatus;
import ro.fmarket.core.validation.api.ValidAccountType;
import ro.fmarket.core.validation.api.ValidPassword;

@Data
public class NewAccountRequest {

	@NotNull
	@Email
	private String email;
	
	@NotNull
	@ValidPassword
	private String password;
	
	@ValidAccountType
	private String accountType;
	
	@ValidAccountStatus
	private String accountStatus;
}
