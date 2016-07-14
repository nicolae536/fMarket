package ro.fmarket.admin.account.company;

import java.util.Set;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class UpdateCompanyRequest {

	@NotNull
	private Integer id;
	
	@NotBlank
	private String name;
	
	private String phone;
	
	private String address;
	
	private String contactPerson;
	
	@NotNull
	private Integer cityId;
	
	@NotNull
	private Integer companyDomainId;
	
	private Set<Integer> demandDomainIds;
	
	private String website;
	
	private Double latitude;
	private Double longitude;
}
