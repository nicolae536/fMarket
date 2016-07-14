package ro.fmarket.model.account;

import org.hibernate.validator.constraints.NotEmpty;

import lombok.Data;

@Data
public class UpdateAccountRequest {

	@NotEmpty
	private String name;
	
	private Integer cityId;
	
	@NotEmpty
	private String phone;
}
