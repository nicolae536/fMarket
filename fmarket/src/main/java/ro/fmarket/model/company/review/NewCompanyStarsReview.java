package ro.fmarket.model.company.review;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class NewCompanyStarsReview {

	@NotNull
	@Min(1)
	private Integer starsNr;
	
	@NotNull
	@Min(1)
	private Integer companyId;
	
}
