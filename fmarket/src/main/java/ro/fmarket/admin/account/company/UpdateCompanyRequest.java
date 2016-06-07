package ro.fmarket.admin.account.company;

import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
public class UpdateCompanyRequest {

	private Integer id;
	
	private String name;
	
	private String phone;
	
	private String address;
	
	private String contactPerson;
	
	private Integer cityId;
	
	private Integer companyDomainId;
	
	private Set<Integer> demandDomainIds;
}
