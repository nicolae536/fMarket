package ro.fmarket.admin.demand;

import javax.validation.constraints.Min;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class DemandSearchObject {

	@Min(1)
	private Integer page;
	
	@Min(1)
	private Integer accountId;
	
	@Min(1)
	private Integer domainId;
	
	private DemandStatus status;
	
	
}
