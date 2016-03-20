package ro.fmarket.admin.account.user;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidPassword;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;

/**
 * Account type is 'USER'
 * @author Luci
 *
 */
@Data
public class NewUserRequest {

	@NotNull
	@Email
	private String email;
	
	@NotNull
	@ValidPassword
	private String password;
	
	private AccountStatus accountStatus;
	
	private String name;
	
	@Min(1)
	private Integer cityId;
	
	private String phone;
	
	private boolean closed;
}
