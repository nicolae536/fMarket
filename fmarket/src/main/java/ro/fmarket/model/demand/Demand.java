package ro.fmarket.model.demand;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.geographical.city.City;
import ro.fmarket.model.geographical.city.DemandCity;

@Data
@Entity
public class Demand extends BaseEntity {

	@ManyToOne
	private Account account;

	private String message;

	private boolean phoneContact;
	private boolean emailContact;
	private boolean allCities;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private DemandStatus status;

	@OneToMany(mappedBy = "demand", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<DemandCity> cities;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime creationDate;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime activationDate;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime closedDate;

}
