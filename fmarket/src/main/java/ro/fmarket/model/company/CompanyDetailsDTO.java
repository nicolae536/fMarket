package ro.fmarket.model.company;

import java.util.List;

import lombok.Data;

@Data
public class CompanyDetailsDTO {

	private int id;
	private String name;
	
	private Double longitude;
	private Double latitude;
	private String phone;
	private String email;
	private String contactPerson;
	private String address;
	private String website;
	private String companyDomain;
	private int score;
	
	private List<String> demandDomains;
	
}
