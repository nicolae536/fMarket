package ro.fmarket.model.demand;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.geographical.city.City;

@Data
@Entity
public class Demand extends BaseEntity {

	@ManyToOne
	private Account account;
	
	private String message;
	
	private boolean phoneContact;
	private boolean emailContact;
	
	@ManyToOne
	private City accountCity;
	
	@ManyToOne
	private City companiesCity;
	
	private boolean allCities;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime creationDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime activationDate;
	
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime closedDate;
	
}
