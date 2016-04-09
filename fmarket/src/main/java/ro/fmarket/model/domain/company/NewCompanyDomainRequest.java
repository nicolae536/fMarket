package ro.fmarket.model.domain.company;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewCompanyDomainRequest {

	@NotBlank
	private String name;

}
