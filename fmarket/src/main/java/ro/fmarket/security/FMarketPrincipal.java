package ro.fmarket.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Data;

@Data
public class FMarketPrincipal extends User {

	private static final long serialVersionUID = 1L;

	private Integer accountId;
	
	public FMarketPrincipal(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}

	
	
}
