package ro.fmarket.mail;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.model.demand.Demand;

@Component
@Transactional
public class NewDemandInterceptorImpl implements NewDemandInterceptor {

//	@Async
	@Override
	public void intercept(Demand demand) {
		System.out.println("INTERCEPTING NEW DEMAND");
		
	}

	
	
}
