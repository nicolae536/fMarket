package ro.fmarket.model.demand;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.SelfDemandConverter;
import ro.fmarket.core.exception.NotAuthorizedException;
import ro.fmarket.core.utils.AccountUtils;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.demand.consts.DemandStatus;
import ro.fmarket.model.domain.demand.DemandDomainDao;
import ro.fmarket.model.geographical.city.CityDao;
import ro.fmarket.model.geographical.city.DemandCity;
import ro.fmarket.model.registration.RegistrationService;
import ro.fmarket.model.token.DemandToken;
import ro.fmarket.model.token.dao.DemandTokenDao;

@Service
public class DemandServiceImpl implements DemandService {

	@Autowired
	private DemandDao demandDao;

	@Autowired
	private DemandDomainDao demandDomainDao;
	
	@Autowired
	private DemandTokenDao demandTokenDao;

	@Autowired
	private CityDao cityDao;

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private RegistrationService registrationService;

	@Autowired
	private MailService mailService;

	@Override
	@Transactional
	public void addDemand(NewDemandRequest request, boolean isAccountLogged) {
		final Demand demand = createNewDemand(request, isAccountLogged);
		demandDao.save(demand);
		if (isAccountLogged) {
			mailService.sendNewDemandMailForLoggedInUser(demand);
		} else {
			String token = createAndSaveDemandToken(request, demand);
			mailService.sendDemandConfirmMail(request.getEmail(), token);
		}
	}

	private String createAndSaveDemandToken(NewDemandRequest request, final Demand demand) {
		DemandToken demandToken = new DemandToken();
		String token = TokenUtils.generateToken();
		while (demandTokenDao.getByToken(token) != null) {
			token = TokenUtils.generateToken();
		}
		demandToken.setCreationDate(DateUtils.now());
		demandToken.setDemand(demand);
		demandToken.setToken(token);
		demandTokenDao.save(demandToken);
		return token;
	}

	@Override
	@Transactional
	public void closeDemand(Integer accountId, CancelDemandRequest request) {
		final Demand demand = demandDao.get(request.getDemandId());
		if (demand != null && demand.getAccount().getId().equals(accountId)) {
			demand.setClosedDate(DateUtils.now());
			demand.setStatus(DemandStatus.CLOSED);
			demandDao.save(demand);
		} else {
			throw new NotAuthorizedException();
		}
	}

	@Override
	@Transactional(readOnly = true)
	public List<SelfDemandDTO> getAccountDemands(Integer accountId) {
		return SelfDemandConverter.toDTOList(demandDao.getDemandsForAccount(accountId));
	}

	private Demand createNewDemand(NewDemandRequest request, boolean isAccountLogged) {
		final Demand demand = new Demand();
		demand.setClosedDate(null);
		demand.setCreationDate(DateUtils.now());
		demand.setDomain(demandDomainDao.load(request.getDomainId()));
		demand.setMessage(request.getMessage());
		demand.setTitle(request.getTitle());
		demand.setPhone(request.getPhone());
		demand.setName(request.getName());
		setAccountForDemand(request, isAccountLogged, demand);
		setDemandCities(request, demand);

		return demand;
	}

	private void setDemandCities(NewDemandRequest request, final Demand demand) {
		demand.setAllCities(request.getAllCities());
		if (!request.getAllCities()) {
			for (Integer cityId : request.getCities()) {
				final DemandCity demandCity = new DemandCity();
				demandCity.setDemand(demand);
				demandCity.setCity(cityDao.load(cityId));
				demand.getCities().add(demandCity);
			}
		}
	}

	/**
	 * Create a new account if user doesn't have one already.
	 * @param request
	 * @param isAccountLogged
	 * @param demand
	 */
	private void setAccountForDemand(NewDemandRequest request, boolean isAccountLogged, Demand demand) {
		Account account;
		if (isAccountLogged) {
			demand.setStatus(DemandStatus.WAITING_FOR_REVIEW);
			account = accountDao.getByEmail(request.getEmail());
		} else {
			demand.setStatus(DemandStatus.PENDING);
			account = accountDao.getByEmail(request.getEmail());
			if (account == null) {
				account = registrationService.registerAutoAccount(request.getEmail());
			} else {
				AccountUtils.validateAccountIsNotClosed(account); // throw exception if account is closed
			}
		}
		AccountDetails accountDetails = account.getAccountDetails();
		accountDetails.setPhone(request.getPhone());
		accountDetails.setName(request.getName());
		if (request.getCities().size() == 1) {
			accountDetails.setCity(cityDao.load(request.getCities().get(0)));
		}
		demand.setAccount(account);
	}

}
