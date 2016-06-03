package ro.fmarket.model.account;

import lombok.Data;

@Data
public class UpdateAccountRequest {

	private String name;
	
	private Integer cityId;
	
	private String phone;
}
