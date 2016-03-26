package ro.fmarket.admin.account.user;

import javax.validation.constraints.Min;

import lombok.Data;
import ro.fmarket.model.account.consts.AccountStatus;

@Data
public class UserSearchObject {

	@Min(1)
	private Integer id;
	
	private String email;
	
	public AccountStatus status;
	
	private String name;
	
	@Min(1)
	private Integer cityId;
	
}
