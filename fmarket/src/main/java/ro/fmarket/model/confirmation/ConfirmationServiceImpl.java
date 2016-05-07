package ro.fmarket.model.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.core.rest.LoginResponse;
import ro.fmarket.core.utils.AccountUtils;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.demand.DemandDao;
import ro.fmarket.model.demand.consts.DemandStatus;
import ro.fmarket.model.token.DemandToken;
import ro.fmarket.model.token.PasswordChangeToken;
import ro.fmarket.model.token.RegistrationToken;
import ro.fmarket.model.token.TokenEntity;
import ro.fmarket.model.token.dao.DemandTokenDao;
import ro.fmarket.model.token.dao.PasswordChangeTokenDao;
import ro.fmarket.model.token.dao.RegistrationTokenDao;
import ro.fmarket.security.SecurityUtils;

@Service
@Transactional
public class ConfirmationServiceImpl implements ConfirmationService {

	@Autowired
	private RegistrationTokenDao registrationTokenDao;

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private DemandTokenDao demandTokenDao;

	@Autowired
	private PasswordChangeTokenDao passwordChangeTokenDao;
	
	@Autowired
	private DemandDao demandDao;
	
	@Autowired
	private SecurityUtils securityUtils;

	@Override
	public LoginResponse confirmRegistration(String token) throws InvalidTokenException {
		RegistrationToken registrationToken = registrationTokenDao.getByToken(token);
		notNullValidation(registrationToken);
		Account account = registrationToken.getAccount();
		AccountUtils.validateAccountIsNotClosed(account);
		if (registrationToken.isExpired()) {
			registrationTokenDao.deleteAllTokensForAccount(account.getId());
			throw new InvalidTokenException("Token is expired");
		}
		account.getHistoricalInfo().setActivationDate(DateUtils.now());
		account.setStatus(AccountStatus.ACTIVE);
		accountDao.save(account);
		registrationTokenDao.deleteAllTokensForAccount(account.getId());
		return securityUtils.authenticateUser(account.getEmail(), account.getType().name());
	}

	@Override
	public LoginResponse confirmPasswordChange(String token) throws InvalidTokenException {
		PasswordChangeToken passwordChangeToken = passwordChangeTokenDao.getByToken(token);
		notNullValidation(passwordChangeToken);
		final Account account = passwordChangeToken.getAccount();
		AccountUtils.validateAccountIsNotClosed(account);
		if (passwordChangeToken.isExpired()) {
			passwordChangeTokenDao.deleteAllTokensForAccount(account.getId());
			throw new InvalidTokenException("Token is expired");
		}
		account.setStatus(AccountStatus.ACTIVE);
		account.setPassword(passwordChangeToken.getNewPassword());
		account.getHistoricalInfo().setLastPasswordChangeDate(DateUtils.now());
		accountDao.save(account);

		passwordChangeTokenDao.deleteAllTokensForAccount(account.getId());
		return securityUtils.authenticateUser(account.getEmail(), account.getType().name());
	}

	@Override
	public LoginResponse confirmDemandCreation(String token) throws InvalidTokenException {
		DemandToken demandToken = demandTokenDao.getByToken(token);
		notNullValidation(demandToken);
		if (demandToken.isExpired()) {
			demandTokenDao.deleteById(demandToken.getId());
			throw new InvalidTokenException("Token is expired");
		}
		Demand demand = demandToken.getDemand();
		
		Account account = demand.getAccount();
		AccountUtils.validateAccountIsNotClosed(account);
		account.setStatus(AccountStatus.ACTIVE);
		accountDao.save(account);
		
		demand.setStatus(DemandStatus.IN_REVIEW);
		demandDao.save(demand);
		
		demandTokenDao.deleteById(demandToken.getId());
		return securityUtils.authenticateUser(account.getEmail(), account.getType().name());
	}

	private void notNullValidation(TokenEntity token) throws InvalidTokenException {
		if (token == null) {
			throw new InvalidTokenException("Token not found");
		}
	}

}
