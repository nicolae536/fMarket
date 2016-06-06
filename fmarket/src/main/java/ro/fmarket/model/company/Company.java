package ro.fmarket.model.company;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.company.logo.CompanyLogo;
import ro.fmarket.model.company.rating.CompanyContactInfo;
import ro.fmarket.model.company.rating.CompanyRating;
import ro.fmarket.model.company.review.CompanyMessageReview;
import ro.fmarket.model.domain.company.CompanyDomain;
import ro.fmarket.model.domain.demand.DemandDomain;

@Data
@Entity
public class Company extends BaseEntity {

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private Account account;

	@Column(nullable = false)
	private String name;
	
	@ManyToOne(optional = false)
	private CompanyDomain domain;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private CompanyContactInfo contactInfo;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private CompanyRating rating;

	@Column(nullable = false)
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime dateInserted;

	@OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
	private Set<CompanyMessageReview> reviews = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "domain_to_company", joinColumns = { @JoinColumn(name = "company_id", nullable = false) }, inverseJoinColumns = {
			@JoinColumn(name = "demand_domain_id", nullable = false) })
	private Set<DemandDomain> demandDomains = new HashSet<>();
	
	@OneToOne(fetch = FetchType.LAZY)
	private CompanyLogo logo;

}
