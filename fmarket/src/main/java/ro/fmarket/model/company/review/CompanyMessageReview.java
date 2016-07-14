package ro.fmarket.model.company.review;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.company.Company;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = {"company", "account"})
public class CompanyMessageReview extends BaseEntity {

	@ManyToOne(optional = false)
	private Account account;
	
	@ManyToOne(optional = false)
	private Company company;
	
	@Column(nullable = false)
	private String message;
	
	@Column(nullable = false)
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime dateInserted;
	
}
