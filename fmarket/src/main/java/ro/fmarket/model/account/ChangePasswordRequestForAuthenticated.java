package ro.fmarket.model.account;

import lombok.Data;

@Data
public class ChangePasswordRequestForAuthenticated {

	private String oldPassword;
	private String newPassword;

}
