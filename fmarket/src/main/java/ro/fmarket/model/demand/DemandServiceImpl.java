package ro.fmarket.model.demand;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.SelfDemandConverter;
import ro.fmarket.core.exception.NotFoundException;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.mail.MailService;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.geographical.city.CityDao;
import ro.fmarket.model.geographical.city.DemandCity;
import ro.fmarket.model.registration.RegistrationService;
import ro.fmarket.model.token.DemandToken;
import ro.fmarket.model.token.dao.DemandTokenDao;

@Service
@Transactional
public class DemandServiceImpl implements DemandService {

	@Autowired
	private DemandDao demandDao;
	
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
	public void addDemand(NewDemandRequest request, boolean isAccountLogged) {
		final Demand demand = createNewDemand(request, isAccountLogged);
		demandDao.save(demand);
		if (!isAccountLogged) {
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
	public void cancelDemand(Integer accountId, CancelDemandRequest request) {
		final Demand demand = demandDao.get(request.getDemandId());
		if (demand != null && demand.getAccount().getId().equals(accountId)) {
			demand.setClosedDate(DateUtils.now());
			demand.setStatus(DemandStatus.CLOSED);
			demandDao.save(demand);
		} else {
			throw new NotFoundException("Demand");
		}
	}

	@Override
	public List<SelfDemandDTO> getAccountDemands(Integer accountId) {
		return SelfDemandConverter.toDTOList(demandDao.getDemandsForAccount(accountId));
	}

	private Demand createNewDemand(NewDemandRequest request, boolean isAccountLogged) {
		final Demand demand = new Demand();
		demand.setClosedDate(null);
		demand.setEmailContact(request.isAgreeEmailContact());
		demand.setPhoneContact(request.isAgreePhoneContact());
		demand.setCreationDate(DateUtils.now());
		demand.setMessage(request.getMessage());
		setAccountForDemand(request, isAccountLogged, demand);
		setDemandCities(request, demand);

		return demand;
	}

	private void setDemandCities(NewDemandRequest request, final Demand demand) {
		demand.setAllCities(request.isAllCities());
		if (!request.isAllCities()) {
			for (Integer cityId : request.getCities()) {
				final DemandCity demandCity = new DemandCity();
				demandCity.setDemand(demand);
				demandCity.setCity(cityDao.load(cityId));
				demand.getCities().add(demandCity);
			}
		}
	}

	private void setAccountForDemand(NewDemandRequest request, boolean isAccountLogged, Demand demand) {
		Account account;
		if (isAccountLogged) {
			account = accountDao.getByEmail(request.getEmail());
			demand.setStatus(DemandStatus.IN_REVIEW);
		} else {
			account = accountDao.getByEmail(request.getEmail());
			if (account == null) {
				account = registrationService.registerAutoAccount(request.getEmail());
			}
			demand.setStatus(DemandStatus.PENDING);
		}
		demand.setAccount(account);
	}

}
