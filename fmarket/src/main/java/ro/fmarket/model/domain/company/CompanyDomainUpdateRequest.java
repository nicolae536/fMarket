package ro.fmarket.model.domain.company;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class CompanyDomainUpdateRequest {

	@NotNull
	@Min(1)
	private Integer id;

	@NotBlank
	private String newName;

}