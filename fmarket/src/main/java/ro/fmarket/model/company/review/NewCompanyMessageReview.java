package ro.fmarket.model.company.review;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewCompanyMessageReview {

	@NotBlank
	@Length(min = 3)
	private String message;
	
	@NotNull
	@Min(1)
	private Integer companyId;
	
}
