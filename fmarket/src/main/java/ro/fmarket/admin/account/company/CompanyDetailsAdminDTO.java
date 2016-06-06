package ro.fmarket.admin.account.company;

import java.util.List;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class CompanyDetailsAdminDTO {

	private String email;
	private String phone;
	private String address;
	private String contactPerson;
	
	private int id;
	
	private String name;
	private String companyDomain;
	private List<String> demandDomains;
	private String city;
	
	private DateTime creationDate;
}
