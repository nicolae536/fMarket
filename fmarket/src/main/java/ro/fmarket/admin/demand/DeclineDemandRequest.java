package ro.fmarket.admin.demand;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class DeclineDemandRequest {

	private String message;
	
	@NotNull
	private Integer id;
}
