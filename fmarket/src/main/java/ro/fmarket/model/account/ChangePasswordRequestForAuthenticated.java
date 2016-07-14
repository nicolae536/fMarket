package ro.fmarket.model.account;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidPassword;

@Data
public class ChangePasswordRequestForAuthenticated {

	@NotBlank
	private String oldPassword;
	
	@ValidPassword
	@NotNull
	private String newPassword;

}
