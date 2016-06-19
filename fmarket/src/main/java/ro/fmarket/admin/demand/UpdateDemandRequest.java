package ro.fmarket.admin.demand;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class UpdateDemandRequest {

	@NotNull
	private Integer demandId;
	
	@NotNull
	private DemandStatus status;
	
	@NotBlank
	private String title;
	
	@NotBlank
	private String message;
	
	@NotNull
	private Integer domainId;
}
