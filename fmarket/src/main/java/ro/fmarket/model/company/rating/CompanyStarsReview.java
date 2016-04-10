package ro.fmarket.model.company.rating;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.company.Company;

@Data
@Entity
public class CompanyStarsReview extends BaseEntity {

	@ManyToOne(optional = false)
	private Account account;

	@ManyToOne(optional = false)
	private Company company;

	@Min(0)
	@Max(5)
	@Column(nullable = false)
	private Integer stars;

	@Column(nullable = false)
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime dateInserted;
}