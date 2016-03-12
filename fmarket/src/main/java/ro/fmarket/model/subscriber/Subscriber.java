package ro.fmarket.model.subscriber;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@Entity
public class Subscriber extends BaseEntity {

	@Column(nullable = false, unique = true, length = 60)
	private String email;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime subscribeDate;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime unsubscribeDate;

	@Column(nullable = false, length = 50, unique = true)
	private String unsubscribeToken;

}
