package ro.fmarket.model.account;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidPassword;

@Data
public class ChangePasswordRequest {

	@Email
	@NotNull
	private String email;
	
	@ValidPassword
	@NotNull
	private String newPassword;
	
}
