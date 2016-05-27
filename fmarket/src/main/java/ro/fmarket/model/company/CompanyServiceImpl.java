package ro.fmarket.model.company;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;
import ro.fmarket.model.company.rating.CompanyContactInfo;
import ro.fmarket.model.company.rating.CompanyRating;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;
import ro.fmarket.model.domain.company.CompanyDomainDao;
import ro.fmarket.model.domain.demand.DemandDomainDao;
import ro.fmarket.model.geographical.city.CityDao;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private CompanyDomainDao companyDomainDao;

	@Autowired
	private DemandDomainDao demandDomainDao;

	@Autowired
	private CityDao cityDao;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public void createCompany(NewCompanyRequest request) {
		Account account = createNewAccount(request);
		Company company = createNewCompany(request, account);
		companyDao.save(company);
	}

	@Override
	public CompanyDetailsDTO getCompanyDetails(Integer id) {
		return null;
	}

	@Override
	public void addStarsReview(Integer accountId, NewCompanyStarsReview request) {

	}

	@Override
	public void addMessageReview(Integer accountId, NewCompanyMessageReview request) {

	}

	@Override
	public List<FullDomainDTO> getCompaniesGroupedByDomain(String name) {
		List<FullDomainDTO> resultList = new ArrayList<>();
		List<Company> sortedCompanies = companyDao.getAllCompanyNames(name);

		Map<String, List<CompanyNameDTO>> groups = new LinkedHashMap<>();

		for (Company company : sortedCompanies) {
			CompanyNameDTO dto = new CompanyNameDTO(company.getId(), company.getName(), "src"); // TODO
			String domain = company.getDomain().getName();
			if (groups.containsKey(domain)) {
				groups.put(domain, Arrays.asList(dto));
			} else {
				groups.get(domain).add(dto);
			}
		}
		for (Map.Entry<String, List<CompanyNameDTO>> entry : groups.entrySet()) {
			resultList.add(new FullDomainDTO(entry.getKey(), entry.getValue()));
		}
		return resultList;
	}

	private Company createNewCompany(NewCompanyRequest request, Account account) {
		Company company = new Company();
		company.setAccount(account);
		company.setName(request.getName());
		company.setContactInfo(createContactInfo(request));
		company.setRating(new CompanyRating());
		company.setDomain(companyDomainDao.load(request.getCompanyDomainId()));
		for (Integer i : request.getDemandDomains()) {
			company.getDemandDomains().add(demandDomainDao.load(i));
		}

		return company;
	}

	private CompanyContactInfo createContactInfo(NewCompanyRequest request) {
		CompanyContactInfo info = new CompanyContactInfo();
		info.setAddress(request.getAddress());
		info.setCity(cityDao.load(request.getCityId()));
		info.setPhone(request.getPhone());
		info.setContactPerson(request.getContactPerson());
		return info;
	}

	private Account createNewAccount(NewCompanyRequest request) {
		final Account account = new Account();
		account.setEmail(request.getEmail());
		account.setPassword(encoder.encode(request.getPassword()));

		final AccountDetails details = new AccountDetails();
		final AccountHistoricalInfo historicalInfo = new AccountHistoricalInfo();
		account.setAccountDetails(details);
		account.setHistoricalInfo(historicalInfo);

		historicalInfo.setCreationDate(DateUtils.now());
		account.setType(AccountType.COMPANY);
		account.setStatus(AccountStatus.ACTIVE);
		return account;
	}
}
