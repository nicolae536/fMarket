package ro.fmarket.model.domain.demand;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewDemandDomainRequest {

	@NotBlank
	private String name;
	
}
