package ro.fmarket.model.token;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.model.account.Account;

@Data
@Entity
public class RegistrationToken extends TokenEntity {

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private Account account;
	
}
