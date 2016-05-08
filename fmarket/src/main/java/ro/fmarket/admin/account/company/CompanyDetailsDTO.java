package ro.fmarket.admin.account.company;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.model.company.review.CompanyMessageReviewDTO;
import ro.fmarket.model.domain.demand.DemandDomain;
import ro.fmarket.model.domain.demand.DemandDomainDTO;

@Data
public class CompanyDetailsDTO {

	private int id;
	private String name;
	private String email;
	private String logoUrl;
	private String phone;
	private String address;
	private String city;
	private int votes;
	private int score;
	private int stars;

	private List<CompanyMessageReviewDTO> reviews = new ArrayList<>();
	private List<DemandDomainDTO> demandDomains = new ArrayList<>();
	
	private DateTime creationDate;
	private int loginTimes;
	private int autoLoginTimes;
	
	
}
