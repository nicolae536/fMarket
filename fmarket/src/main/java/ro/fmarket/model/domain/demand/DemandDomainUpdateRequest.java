package ro.fmarket.model.domain.demand;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class DemandDomainUpdateRequest {

	@NotNull
	private Integer id;
	
	@NotBlank
	private String newName;
	
	private Integer domainId;
	
}
