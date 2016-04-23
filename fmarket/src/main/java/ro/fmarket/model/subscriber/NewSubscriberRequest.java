package ro.fmarket.model.subscriber;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;

@Data
public class NewSubscriberRequest {

	@NotNull
	@Email
	private String email;
	
}
