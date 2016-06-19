package ro.fmarket.admin.demand;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class DemandSearchObject {

	private Integer page;
	
	private Integer accountId;
	
	private Integer domainId;
	
	private DemandStatus status;
	
	
}
