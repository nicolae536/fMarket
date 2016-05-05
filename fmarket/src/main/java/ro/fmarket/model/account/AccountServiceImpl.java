package ro.fmarket.model.account;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.exception.NotFoundException;
import ro.fmarket.core.utils.AccountUtils;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.token.PasswordChangeToken;
import ro.fmarket.model.token.dao.PasswordChangeTokenDao;
import ro.fmarket.security.FMarketPrincipal;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private PasswordChangeTokenDao tokenDao;

	@Autowired
	private MailService mailService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Account account = accountDao.getActiveByEmail(email);
		if (account == null || !AccountStatus.ACTIVE.equals(account.getStatus())) {
			throw new UsernameNotFoundException(email + " was not found");
		} else {
			return createPrincipal(account);
		}
	}

	@Override
	public void requestPasswordChange(String email, String newPassword, boolean isLoggedIn) {
		final Account account = accountDao.getByEmail(email);
		if (account == null) {
			throw new NotFoundException("Account");
		}
		if (isLoggedIn) {
			account.setPassword(passwordEncoder.encode(newPassword));
			account.getHistoricalInfo().setLastPasswordChangeDate(DateUtils.now());
			accountDao.save(account);
		} else {
			AccountUtils.validateAccountIsNotClosed(account);
			requestPasswordChangeForAccount(account, newPassword);
		}
	}

	@Override
	public UserDetails getUserDetails(String email) {
		Account account = accountDao.getByEmail(email);
		if (account == null) {
			throw new NotFoundException("Account");
		}
		UserDetails userDetails = new FMarketPrincipal(account.getEmail(), null, createAuthorities(account.getType().name()));
		return userDetails;
	}

	@Override
	public void requestPasswordChange(Account account, String newPassword) {
		requestPasswordChangeForAccount(account, newPassword);
	}

	private void requestPasswordChangeForAccount(Account account, String newPassword) {
		final PasswordChangeToken token = createPasswordChangeToken(account, newPassword);
		tokenDao.save(token);
		mailService.sendPasswordChangeMail(account.getEmail(), token.getToken());
	}

	private FMarketPrincipal createPrincipal(Account account) {
		String email = account.getEmail();
		String password = account.getPassword();
		String role = account.getType().name();
		List<GrantedAuthority> authorities = createAuthorities(role);
		final FMarketPrincipal principal = new FMarketPrincipal(email, password, authorities);
		principal.setAccountId(account.getId());
		return principal;
	}

	private List<GrantedAuthority> createAuthorities(String role) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(role));
		return authorities;
	}

	private PasswordChangeToken createPasswordChangeToken(Account account, String newPassword) {
		final PasswordChangeToken result = new PasswordChangeToken();
		result.setAccount(account);
		result.setNewPassword(newPassword);
		result.setCreationDate(DateUtils.now());
		String token = TokenUtils.generateToken();
		while (tokenDao.getByToken(token) != null) {
			token = TokenUtils.generateToken();
		}
		result.setToken(token);
		return result;
	}

}
