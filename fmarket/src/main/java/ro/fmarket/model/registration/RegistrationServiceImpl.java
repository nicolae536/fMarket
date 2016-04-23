package ro.fmarket.model.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.utils.AccountUtils;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.AccountService;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;
import ro.fmarket.model.subscriber.SubscriberService;
import ro.fmarket.model.token.RegistrationToken;
import ro.fmarket.model.token.dao.RegistrationTokenDao;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private SubscriberService subscriberService;

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private RegistrationTokenDao tokenDao;

	@Override
	public void registerAccount(NewAccountRequest request) {
		Account account = accountDao.getByEmail(request.getEmail());
		if (account == null) {
			final Account newAccount = createNewAccount(request);
			accountDao.save(newAccount);
			String token = createAndSaveRegistrationToken(newAccount);
			mailService.sendRegistrationMail(newAccount.getEmail(), token);
		} else {
			AccountUtils.validateAccountIsNotClosed(account); //throws expcetion if it is 
			if (AccountStatus.AUTO.equals(account.getStatus())) { // update account status
				account.setStatus(AccountStatus.ACTIVE);
				account.getHistoricalInfo().setActivationDate(DateUtils.now());
				accountDao.save(account);
			}
			accountService.requestPasswordChange(account.getEmail(), request.getPassword(), false);
		}
		if (request.getSubscribe()) {
			subscriberService.subscribeEmail(request.getEmail());
		}
	}

	@Override
	public Account registerAutoAccount(String email) {
		Account account = createAutoAccount(email);
		accountDao.save(account);
		return account;
	}

	private Account createNewAccount(NewAccountRequest request) {
		final Account account = new Account();
		account.setEmail(request.getEmail());
		account.setPassword(encoder.encode(request.getPassword()));

		final AccountDetails details = new AccountDetails();
		final AccountHistoricalInfo historicalInfo = new AccountHistoricalInfo();
		account.setAccountDetails(details);
		account.setHistoricalInfo(historicalInfo);

		historicalInfo.setCreationDate(DateUtils.now());
		account.setType(AccountType.USER);
		account.setStatus(AccountStatus.PENDING);
		return account;
	}

	private Account createAutoAccount(String email) {
		final Account account = new Account();
		account.setEmail(email);
		account.setPassword("auto"); //downloadezi squirell intre timp? da

		final AccountDetails details = new AccountDetails();
		final AccountHistoricalInfo historicalInfo = new AccountHistoricalInfo();
		account.setAccountDetails(details);
		account.setHistoricalInfo(historicalInfo);

		historicalInfo.setCreationDate(DateUtils.now());
		account.setType(AccountType.USER);
		account.setStatus(AccountStatus.AUTO);
		return account;
	}
	
	private String createAndSaveRegistrationToken(Account account) {
		final RegistrationToken registrationToken = new RegistrationToken();
		registrationToken.setAccount(account);
		registrationToken.setCreationDate(DateUtils.now());
		registrationToken.setToken(TokenUtils.generateToken());
		tokenDao.save(registrationToken);
		return registrationToken.getToken();
	}

}