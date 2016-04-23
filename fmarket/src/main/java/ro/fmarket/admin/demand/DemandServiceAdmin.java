package ro.fmarket.admin.demand;

import java.util.List;

import ro.fmarket.core.rest.PaginatedResponse;

public interface DemandServiceAdmin {

	void acceptDemand(int id);
	
	void updateDemand(UpdateDemandRequest request);
	
	void declineDemand(DeclineDemandRequest message);
	
	List<DemandAdminDTO> getInReviewDemands();
	
	PaginatedResponse<DemandAdminDTO> searchDemands(DemandSearchObject searchObject);
	
	int getNewDemandsCount();
	
	DemandDetailsDTO getDemandDetails(int id);
	
}
