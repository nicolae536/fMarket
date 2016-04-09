package ro.fmarket.model.company;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.company.rating.CompanyContactInfo;
import ro.fmarket.model.company.rating.CompanyMessageReview;
import ro.fmarket.model.company.rating.CompanyRating;
import ro.fmarket.model.domain.company.CompanyDomain;
import ro.fmarket.model.geographical.city.City;

@Data
@Entity
public class Company extends BaseEntity {

	@OneToOne(optional = false)
	private Account account;

	@Column(nullable = false)
	private String name;

	@ManyToOne(optional = false)
	private CompanyDomain domain;
	
	@OneToOne(optional = false)
	private CompanyContactInfo contactInfo;
	
	@OneToOne(optional = false)
	private CompanyRating rating;

	@Column(nullable = false)
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime dateInserted;
	
	@OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
	private Set<CompanyMessageReview> reviews = new HashSet<>();

}
