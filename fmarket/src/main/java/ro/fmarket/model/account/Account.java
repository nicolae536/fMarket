package ro.fmarket.model.account;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;

@Data
@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "id", "email" }) })
public class Account extends BaseEntity {

	@Column(nullable = false)
	private String email;

	@Column(nullable = false, columnDefinition = "bit", length = 70)
	private String password;

	@Enumerated(EnumType.STRING)
	private AccountType type;

	@Enumerated(EnumType.STRING)
	private AccountStatus status;

	@OneToOne(optional = false)
	private AccountHistoricalInfo historicalInfo;

	@OneToOne(optional = false)
	private AccountDetails accountDetails;

}
