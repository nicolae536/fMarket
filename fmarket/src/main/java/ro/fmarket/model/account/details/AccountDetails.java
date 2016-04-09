package ro.fmarket.model.account.details;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.geographical.city.City;

@Data
@Entity
public class AccountDetails extends BaseEntity {

	private String name;
	
	private String phone;
	
	@ManyToOne
	private City city;
	
	/**
	 *  de unde vrea produse.
	 */
	@ManyToOne
	private City cityFrom;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime updatedDate;
	
}
