package ro.fmarket.model.company;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;
import ro.fmarket.core.validation.api.ValidPassword;

@Data
public class NewCompanyRequest {

	@NotBlank
	private String name;
	
	@NotNull
	private Integer companyDomainId;
	
	private List<Integer> demandDomains = new ArrayList<>();
	
	//contact
	
	@NotNull
	@Email
	private String email;
	
	@NotNull
	@ValidPassword
	private String password;
	
	@NotBlank
	private String phone;
	
	private String contactPerson;
	
	@NotBlank
	private String address;
	
	@NotNull
	private Integer cityId;
	
}
