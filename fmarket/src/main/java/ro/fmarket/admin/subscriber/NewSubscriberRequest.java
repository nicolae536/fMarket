package ro.fmarket.admin.subscriber;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;

@Data
public class NewSubscriberRequest {

	@Email
	@NotNull
	private String email;
	
}
