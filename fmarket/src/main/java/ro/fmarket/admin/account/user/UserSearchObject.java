package ro.fmarket.admin.account.user;

import lombok.Data;
import ro.fmarket.model.account.consts.AccountStatus;

@Data
public class UserSearchObject {

	private Integer id;
	private String email;
	public AccountStatus status;
	private String name;
	private Integer cityId;
	
}
