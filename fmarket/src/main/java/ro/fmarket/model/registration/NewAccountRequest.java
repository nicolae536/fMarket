package ro.fmarket.model.registration;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidPassword;

@Data
public class NewAccountRequest {

	@Email
	@NotNull
	private String email;
	
	@ValidPassword
	@NotNull
	private String password;
	
	@NotNull
	private Boolean subscribe;
	
}
