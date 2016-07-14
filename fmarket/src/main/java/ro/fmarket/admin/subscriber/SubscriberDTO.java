package ro.fmarket.admin.subscriber;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class SubscriberDTO {

	private Integer id;
	private String email;
	private String unsubscribeToken;
	private boolean unsubscribed;
	private DateTime subscribeDate;
	private DateTime unsubscribeDate;

}
