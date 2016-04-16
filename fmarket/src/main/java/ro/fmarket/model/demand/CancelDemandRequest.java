package ro.fmarket.model.demand;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CancelDemandRequest {

	@NotNull
	private Integer demandId;
	
}
