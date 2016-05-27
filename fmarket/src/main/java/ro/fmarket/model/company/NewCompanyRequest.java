package ro.fmarket.model.company;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class NewCompanyRequest {

	private String name;
	
	private Integer companyDomainId;
	
	private List<Integer> demandDomains = new ArrayList<>();
	
	//contact
	private String email;
	private String phone;
	private String contactPerson;
	private String address;
	private Integer cityId;
	
}
