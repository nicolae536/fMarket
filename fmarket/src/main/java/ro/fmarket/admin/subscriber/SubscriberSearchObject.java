package ro.fmarket.admin.subscriber;

import lombok.Data;

@Data
public class SubscriberSearchObject {

	private Integer id;
	
	private String email;
	
	private SubscriberSortKey sortKey;
	
	private Boolean desc;
}
