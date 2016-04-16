package ro.fmarket.model.demand;

import java.util.List;

public interface DemandService {

	void addDemand(NewDemandRequest request, boolean isAccountLogged);
	
	void cancelDemand(Integer accountId, CancelDemandRequest demandId);
	
	List<SelfDemandDTO> getAccountDemands(Integer accountId);

}
