package ro.fmarket.admin.account.company;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class CompanySearchObject {

	@NotNull
	@Min(1)
	private Integer page;
	
	private Integer id;
	
	private String name;
	
	private String email;
	
	private Integer companyDomainId;
	
	private Integer demandDomainId;
	
}
