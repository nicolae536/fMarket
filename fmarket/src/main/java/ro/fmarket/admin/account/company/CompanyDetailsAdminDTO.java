package ro.fmarket.admin.account.company;

import java.util.List;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.model.domain.company.CompanyDomain;
import ro.fmarket.model.domain.company.CompanyDomainDTO;
import ro.fmarket.model.domain.demand.DemandDomain;
import ro.fmarket.model.geographical.city.City;

@Data
public class CompanyDetailsAdminDTO {

	private String email;
	private String phone;
	private String address;
	private String contactPerson;
	private String website;
	private Double latitude;
	private Double longitude;
	
	private int id;
	
	private String name;
	private CompanyDomainDTO companyDomain;
	private List<DemandDomain> demandDomains;
	private City city;
	
	private DateTime creationDate;
}
