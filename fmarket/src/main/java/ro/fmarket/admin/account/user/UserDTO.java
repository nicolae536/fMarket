package ro.fmarket.admin.account.user;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class UserDTO {

	private Integer id;
	private String email;
	private String type;
	private String status;
	private DateTime creationDate;
	private DateTime closedDate;
	private DateTime activationDate;
	private DateTime lastPasswordChangeDate;
	private DateTime lastLoginDate;
	private DateTime lastAutoLoginDate;
	private String name;
	private Integer cityId;
	private String city;
	private Integer loginTimes;
	private Integer autoLoginTimes;
}
