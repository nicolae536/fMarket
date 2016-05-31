package ro.fmarket.model.company;

import java.util.List;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class CompanyDetailsDTO {

	private String email;
	private DateTime creationDate;
	
	
	private int id;
	
	private String company;
	private String companyDomain;
	private List<String> demandDomains;
	private String city;
	
	
}
