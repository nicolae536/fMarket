package ro.fmarket.model.token;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.model.account.Account;

@Data
@Entity
public class PasswordChangeToken extends TokenEntity {

	@ManyToOne(optional = false)
	private Account account;
	
	@Column(nullable = false, columnDefinition = "binary(60)")
	private String newPassword;
	
}
