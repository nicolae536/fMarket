package ro.fmarket.model.token;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.model.account.Account;

@Entity
@Data
public class DemandAccessToken extends TokenEntity {

	@ManyToOne(optional = false)
	private Account account;
	
}
