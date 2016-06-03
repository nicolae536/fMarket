package ro.fmarket.model.account.details;

import lombok.Data;

@Data
public class AccountDetailsDTO {

	private String name;
	
	private String city;
	
	private String phone;
	
	private boolean isSubscribed;
}
