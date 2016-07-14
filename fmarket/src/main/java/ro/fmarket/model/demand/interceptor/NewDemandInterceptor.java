package ro.fmarket.model.demand.interceptor;

import ro.fmarket.model.demand.Demand;

public interface NewDemandInterceptor {

	void intercept(Demand demand);
	
}
