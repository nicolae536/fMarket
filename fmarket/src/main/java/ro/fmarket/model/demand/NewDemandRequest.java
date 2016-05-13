package ro.fmarket.model.demand;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewDemandRequest {

	/*
	 * Demand
	 */
	@NotBlank
	private String message;

	@Size(max = 10)
	private List<Integer> cities;
	
	private Integer domainId;
	private String title;

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
	private boolean allCities;

}
