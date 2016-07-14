package ro.fmarket.admin.demand;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class DeclineDemandRequest {

	@NotBlank
	private String message;
	
	@NotNull
	private Integer id;
}
