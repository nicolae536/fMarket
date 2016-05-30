package ro.fmarket.admin.account.company;

import lombok.Data;

@Data
public class CompanyListItemAdmin {
	
	private int id;
	
	private int accountId;
	
	private String name;
	
	private String email;

	private String companyDomain;
	
}
