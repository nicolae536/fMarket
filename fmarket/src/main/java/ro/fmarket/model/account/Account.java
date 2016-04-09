package ro.fmarket.model.account;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;

@Data
@Entity
public class Account extends BaseEntity {

	@Email
	@Column(unique = true, nullable = false, length = 60)
	private String email;

	@Column(nullable = false, columnDefinition = "binary", length = 70)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(length = 15)
	private AccountType type;

	@Enumerated(EnumType.STRING)
	@Column(length = 15, nullable = false)
	private AccountStatus status;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private AccountHistoricalInfo historicalInfo;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private AccountDetails accountDetails;

	
}
