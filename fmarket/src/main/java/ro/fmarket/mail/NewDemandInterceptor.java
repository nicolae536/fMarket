package ro.fmarket.mail;

import ro.fmarket.model.demand.Demand;

public interface NewDemandInterceptor {

	void intercept(Demand demand);
	
}
