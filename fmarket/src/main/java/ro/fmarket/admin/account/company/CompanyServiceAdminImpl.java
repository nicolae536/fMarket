package ro.fmarket.admin.account.company;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.CompanyAdminConverter;
import ro.fmarket.core.exception.NotFoundException;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountDao;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.account.consts.AccountType;
import ro.fmarket.model.account.details.AccountDetails;
import ro.fmarket.model.account.historicalinfo.AccountHistoricalInfo;
import ro.fmarket.model.company.Company;
import ro.fmarket.model.company.CompanyDao;
import ro.fmarket.model.company.NewCompanyRequest;
import ro.fmarket.model.company.rating.CompanyContactInfo;
import ro.fmarket.model.company.rating.CompanyRating;
import ro.fmarket.model.domain.company.CompanyDomainDao;
import ro.fmarket.model.domain.demand.DemandDomainDao;
import ro.fmarket.model.geographical.city.CityDao;

@Service
@Transactional
public class CompanyServiceAdminImpl implements CompanyServiceAdmin {

	private static final Logger LOG = Logger.getLogger(CompanyServiceAdminImpl.class);
	
	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private CompanyDomainDao companyDomainDao;

	@Autowired
	private DemandDomainDao demandDomainDao;

	@Autowired
	private CityDao cityDao;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public PaginatedResponse<CompanyListItemAdmin> searchCompanies(CompanySearchObject searchObject) {
		Criteria criteria1 = companyDao.createCompanyCriteria(searchObject);
		Criteria criteria2 = companyDao.createCompanyCriteria(searchObject);
		Long totalPages = companyDao.getCriteriaTotalCount(criteria1);
		Integer page = searchObject.getPage();
		List<Company> companies = companyDao.searchCompanies(criteria2, page);
		List<CompanyListItemAdmin> data = CompanyAdminConverter.toListItems(companies);
		return new PaginatedResponse<CompanyListItemAdmin>(data, totalPages.intValue(), page);
	}

	@Override
	public void createCompany(NewCompanyRequest request) {
		LOG.info("Creating new company");
		Account account = createNewAccount(request);
		Company company = createNewCompany(request, account);
		companyDao.save(company);
		LOG.info("New company was saved");

	}
	
	@Override
	public void updateCompany(UpdateCompanyRequest request) {
		Company company = companyDao.get(request.getId());
		if (company == null) {
			throw new NotFoundException("Company");
		}
		updateCompany(company, request);
		companyDao.update(company);

	}

	@Override
	public void deleteCompany(int id) {
		companyDao.deleteById(id);
	}

//	@Override
//	public CompanyAdminDTO getCompanyDetails(int id) {
//		final Company company = companyDao.get(id);
//		return CompanyAdminConverter.toDTO(company);
//	}

	private Company createNewCompany(NewCompanyRequest request, Account account) {
		Company company = new Company();
		company.setDateInserted(DateUtils.now());
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
		info.setEmail(request.getEmail());
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

	private void updateCompany(Company company, UpdateCompanyRequest request) {
		
	}

	@Override
	public CompanyDetailsAdminDTO getCompanyDetails(int id) {
		Company company = companyDao.get(id);
		return CompanyAdminConverter.toDetails(company);
	}

}
