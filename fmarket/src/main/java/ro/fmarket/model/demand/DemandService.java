package ro.fmarket.model.demand;

public interface DemandService {

	void addDemand(Integer accountId, NewDemandRequest request);
	
	void cancelDemand(Integer accountId, CancelDemandRequest demandId);
	
	void getAccountDemands(Integer accountId);

}
