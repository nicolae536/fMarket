package ro.fmarket.admin.subscriber;

import javax.validation.constraints.Min;

import lombok.Data;

@Data
public class SubscriberSearchObject {

	@Min(1)
	private Integer id;
	
	private String email;
	
}
