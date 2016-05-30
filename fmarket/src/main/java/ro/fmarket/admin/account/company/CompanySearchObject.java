package ro.fmarket.admin.account.company;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CompanySearchObject {

	@NotNull
	private Integer page;
	
	private Integer accountId;
	
	private Integer companyId;
	
	private String name;
	
	private String email;
	
	private Integer companyDomainId;
	
	private Integer demandDomainId;
	
}
