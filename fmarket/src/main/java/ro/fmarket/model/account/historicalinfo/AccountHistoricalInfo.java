package ro.fmarket.model.account.historicalinfo;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@Entity
public class AccountHistoricalInfo extends BaseEntity {

	@Column(nullable = false)
	private Integer loginTimes = 0;
	
	@Column(nullable = false)
	private Integer autoLoginTimes = 0;
	
	@Column(nullable = false)
	private Integer facebookLoginTimes = 0;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime lastFacebookLoginDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime lastLoginDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime lastAutoLoginDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime lastPasswordChangeDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime creationDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime activationDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime closedDate;
}
