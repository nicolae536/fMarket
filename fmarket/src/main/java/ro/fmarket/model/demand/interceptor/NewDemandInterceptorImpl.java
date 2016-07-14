package ro.fmarket.model.demand.interceptor;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import ro.fmarket.mail.MailService;
import ro.fmarket.model.company.CompanyDao;
import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.geographical.city.DemandCity;

@Component
public class NewDemandInterceptorImpl implements NewDemandInterceptor {

	@Autowired
	private MailService mailService;
	
	@Autowired
	private CompanyDao companyDao;
	
	@Override
	@Async
	@Transactional
	public void intercept(Demand demand) {
		Boolean allCities = demand.getAllCities();
		Integer domainId = demand.getDomain().getId();
		List<String> companyEmails;
		if (allCities) {
			companyEmails = companyDao.getByDomainFromAllCities(domainId);
		} else {
			List<Integer> cities = new ArrayList<>();
			for (DemandCity city : demand.getCities()) {
				cities.add(city.getCity().getId());
			}
			companyEmails = companyDao.getEmailsByDomainAndCities(domainId, cities);
		}
		mailService.sendMailToCompaniesForNewDemand(demand, companyEmails);
	}

	
	
}
