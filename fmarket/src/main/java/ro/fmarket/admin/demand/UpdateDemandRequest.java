package ro.fmarket.admin.demand;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class UpdateDemandRequest {

	private int demandId;
	
	private DemandStatus status;
	
	private String title;
	
	private String message;
	
	private int domainId;
}
