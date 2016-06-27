package ro.fmarket.admin.account.company;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import lombok.Data;

@Data
public class CompanySearchObject {

	@NotNull
	private Integer page;
	
	private Integer accountId;
	
	private Integer companyId;
	
	private String name;
	
	@Email
	private String email;
	
	private Integer companyDomain; //TODO should be ID
	
	private List<Integer> demandDomains; //TODO also IDS
	
}
