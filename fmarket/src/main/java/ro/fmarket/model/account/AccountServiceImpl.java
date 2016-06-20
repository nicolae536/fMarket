package ro.fmarket.model.account;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.exception.ForbiddenException;
import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.core.exception.NotFoundException;
import ro.fmarket.core.utils.AccountUtils;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.details.AccountDetailsDTO;
import ro.fmarket.model.geographical.city.City;
import ro.fmarket.model.geographical.city.CityDao;
import ro.fmarket.model.subscriber.Subscriber;
import ro.fmarket.model.subscriber.SubscriberDao;
import ro.fmarket.model.subscriber.SubscriberService;
import ro.fmarket.model.token.DemandAccessToken;
import ro.fmarket.model.token.PasswordChangeToken;
import ro.fmarket.model.token.dao.DemandAccessTokenDao;
import ro.fmarket.model.token.dao.PasswordChangeTokenDao;
import ro.fmarket.security.FMarketPrincipal;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

	private static final Logger LOG = Logger.getLogger(AccountServiceImpl.class);

	@Autowired
	private SubscriberDao subscriberDao;

	@Autowired
	private CityDao cityDao;

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private PasswordChangeTokenDao tokenDao;
	
	@Autowired
	private DemandAccessTokenDao demandAccessTokenDao;

	@Autowired
	private SubscriberService subscriberService;

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
	public void requestPasswordChange(String email, String newPassword) {
		final Account account = accountDao.getByEmail(email);
		if (account == null) {
			throw new NotFoundException("Account");
		}
		AccountUtils.validateAccountIsNotClosed(account);
		requestPasswordChangeForAccount(account, newPassword);
	}

	@Override
	public UserDetails getUserDetails(String email) {
		Account account = accountDao.getByEmail(email);
		if (account == null) {
			throw new NotFoundException("Account");
		}
		UserDetails userDetails = new FMarketPrincipal(account.getEmail(), "", createAuthorities(account.getType().name()));
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
		result.setNewPassword(passwordEncoder.encode(newPassword));
		result.setCreationDate(DateUtils.now());
		String token = TokenUtils.generateToken();
		while (tokenDao.getByToken(token) != null) {
			token = TokenUtils.generateToken();
		}
		result.setToken(token);
		return result;
	}

	@Override
	public void changePasswordForAuthenticatedUser(String email, String oldPassword, String newPassword) {
		Account account = accountDao.getByEmail(email);
		if (!passwordEncoder.matches(oldPassword, account.getPassword())) {
			throw new ForbiddenException();
		} else {
			account.setPassword(passwordEncoder.encode(newPassword));
			account.getHistoricalInfo().setLastPasswordChangeDate(DateUtils.now());
			accountDao.save(account);
		}
	}

	@Override
	public void setSubscription(String email, boolean subscribe) {
		if (subscribe) {
			subscriberService.subscribeEmail(email);
		} else {
			subscriberService.unsubscribeEmail(email);
		}

	}

	@Override
	public void updateAccount(int accountId, UpdateAccountRequest request) {
		Account account = accountDao.get(accountId);
		AccountDetails details = account.getAccountDetails();
		if (request.getCityId() != null) {
			details.setCity(cityDao.load(request.getCityId()));
		}
		details.setName(request.getName());
		details.setPhone(request.getPhone());

	}

	@Override
	public AccountDetailsDTO getAccountDetails(int accountId) {
		Account account = accountDao.get(accountId);
		AccountDetails accountDetails = account.getAccountDetails();
		Subscriber subscriber = subscriberDao.getByEmail(account.getEmail());
		AccountDetailsDTO result = new AccountDetailsDTO();
		result.setSubscribed(subscriber != null && subscriber.getUnsubscribeDate() == null);
		City city = accountDetails.getCity();
		if (city != null) {
			result.setCityName(city.getName());
			result.setCityId(city.getId());
		}
		result.setPhone(accountDetails.getPhone());
		result.setName(accountDetails.getName());
		return result;
	}

	@Override
	public Account getByDemandTokenAccess(String token) throws InvalidTokenException {
		DemandAccessToken foundToken = demandAccessTokenDao.getByToken(token);
		if (foundToken == null || foundToken.isExpired()) {
			throw new InvalidTokenException();
		} else {
			return foundToken.getAccount();
		}
		
	}

}
