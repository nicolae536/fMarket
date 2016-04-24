package ro.fmarket.model.demand.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import ro.fmarket.mail.MailService;
import ro.fmarket.model.company.CompanyDao;
import ro.fmarket.model.demand.Demand;

@Component
public class NewDemandInterceptorImpl implements NewDemandInterceptor {

	@Autowired
	private MailService mailService;
	
	@Autowired
	private CompanyDao companyDao;
	
	@Async
	@Override
	public void intercept(Demand demand) {
		System.out.println("INTERCEPTING NEW DEMAND");
//		List<Company> companies = companyDao.getByDomain(demand.getDomain().getId());
		//TODO send mail to user
	}

	
	
}
