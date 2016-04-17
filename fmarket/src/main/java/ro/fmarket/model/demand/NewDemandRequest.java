package ro.fmarket.model.demand;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;

import lombok.Data;

@Data
public class NewDemandRequest {

	/*
	 * Demand
	 */
	private String message;

	@Size(min = 1, max = 10)
	private List<Integer> cities = new ArrayList<>();
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
	private boolean agreePhoneContact;
	private boolean agreeEmailContact;
	private boolean allCities;

}
