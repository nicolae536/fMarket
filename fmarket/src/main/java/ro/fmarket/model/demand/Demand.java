package ro.fmarket.model.demand;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.demand.consts.DemandStatus;
import ro.fmarket.model.domain.demand.DemandDomain;
import ro.fmarket.model.geographical.city.DemandCity;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = "cities")
public class Demand extends BaseEntity {

	@ManyToOne
	private Account account;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String message;

	@NotNull
	private Boolean allCities;

	@ManyToOne(optional = false)
	private DemandDomain domain;
	
	private String phone;
	
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private DemandStatus status;

	@OneToMany(mappedBy = "demand", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<DemandCity> cities = new HashSet<>();

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime creationDate;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime activationDate;

	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime closedDate;

}
