package ro.fmarket.model.demand;

import javax.validation.constraints.NotNull;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandCloseCause;

@Data
public class CancelDemandRequest {

	@NotNull
	private Integer demandId;
	
	@NotNull
	private DemandCloseCause closeCause;
	
}
