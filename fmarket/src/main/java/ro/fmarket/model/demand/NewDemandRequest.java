package ro.fmarket.model.demand;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewDemandRequest {

	@NotBlank
	private String title;
	
	/*
	 * Demand
	 */
	@NotBlank
	private String message;

	private Integer domainId;

	/**
	 * Account
	 */
	@Email
	@NotNull
	private String email;

	/*
	 * Contact
	 */
	private String phone;
	
	private String name;
	
	@Size(max = 10)
	private List<Integer> cities;
	
	private Boolean allCities;

}
