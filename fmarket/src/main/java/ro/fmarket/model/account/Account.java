package ro.fmarket.model.account;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.validator.constraints.Email;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;
import ro.fmarket.model.demand.Demand;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = "demands")
public class Account extends BaseEntity {

	@Email
	@Column(unique = true, nullable = false, length = 60)
	private String email;

	@Column(nullable = false, columnDefinition = "binary(60)")
	private String password;

	@Column(length = 15, nullable = false)
	@Enumerated(EnumType.STRING)
	private AccountType type;

	@Enumerated(EnumType.STRING)
	@Column(length = 15, nullable = false)
	private AccountStatus status;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private AccountHistoricalInfo historicalInfo;

	@OneToOne(optional = false, cascade = CascadeType.ALL)
	private AccountDetails accountDetails;
	
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Demand> demands = new HashSet<>(0);
	
	@Column(nullable = false)
	private Boolean isFacebook = false;

}
