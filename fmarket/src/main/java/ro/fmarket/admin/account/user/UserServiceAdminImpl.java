package ro.fmarket.admin.account.user;

import static ro.fmarket.core.constants.PaginationConstants.ACCOUNTS_PAGE_SIZE;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.AccountConverter;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.PaginationUtils;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;
import ro.fmarket.model.geographical.city.CityDao;;

@Service
@Transactional
public class UserServiceAdminImpl implements UserServiceAdmin {

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private CityDao cityDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public PaginatedResponse<UserDTO> searchUsers(UserSearchObject searchObject, Integer page) {
		final Criteria criteria1 = accountDao.createUserCriteria(searchObject);
		final Criteria criteria2 = accountDao.createUserCriteria(searchObject);
		List<Account> users = accountDao.searchUsers(criteria1, page);
		int totalCount = accountDao.getCriteriaTotalCount(criteria2).intValue();
		List<UserDTO> dtoUserList = AccountConverter.toDTOList(users);
		final PaginatedResponse<UserDTO> collectionResponse = new PaginatedResponse<>(dtoUserList);
		collectionResponse.setTotalPages(PaginationUtils.calculateTotalPages(ACCOUNTS_PAGE_SIZE, totalCount));
		return collectionResponse;
	}

	@Override
	public void deleteUser(Integer accountId) {
		accountDao.deleteById(accountId);
	}

	@Override
	public void createUser(NewUserRequest request) {
		final Account account = createEmptyUser();
		fillUserFields(account, request);
		accountDao.save(account);
	}

	@Override
	public void updateUser(Integer accountId, NewUserRequest request) {
		final Account account = accountDao.get(accountId);
		fillUserFields(account, request);
		accountDao.update(account);
	}

	private void fillUserFields(Account account, NewUserRequest request) {
		account.setEmail(request.getEmail());
		account.setStatus(request.getAccountStatus());
		account.setType(AccountType.USER);
		if (request.getPassword() != null) {
			account.setPassword(passwordEncoder.encode(request.getPassword()));
		}
		AccountDetails accountDetails = account.getAccountDetails();
		AccountHistoricalInfo historicalInfo = account.getHistoricalInfo();

		if (request.getCityId() != null) { // city
			accountDetails.setCity(cityDao.load(request.getCityId()));
		} else {
			accountDetails.setCity(null);
		}
		accountDetails.setName(request.getName());
		accountDetails.setPhone(request.getPhone());

	}

	private Account createEmptyUser() {
		final Account account = new Account();
		final AccountDetails details = new AccountDetails();
		final AccountHistoricalInfo historicalInfo = new AccountHistoricalInfo();
		account.setAccountDetails(details);
		account.setHistoricalInfo(historicalInfo);

		historicalInfo.setCreationDate(DateUtils.now());
		account.setType(AccountType.USER);
		account.setStatus(AccountStatus.ACTIVE);
		return account;
	}

	@Override
	public UserDTO getUser(Integer accountId) {
		Account account = accountDao.get(accountId);
		return AccountConverter.toDTO(account);
	}

}
