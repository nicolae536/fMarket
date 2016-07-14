package ro.fmarket.model.company.review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.company.Company;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class CompanyStarsReview extends BaseEntity {

	@ManyToOne(optional = false)
	@JoinColumn(unique = true)
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
