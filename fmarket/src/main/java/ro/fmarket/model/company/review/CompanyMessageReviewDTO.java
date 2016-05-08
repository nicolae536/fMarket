package ro.fmarket.model.company.review;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class CompanyMessageReviewDTO {

	private int companyId;
	private String companyEmail;
	
	private int accountId;
	private String accountEmail;
	
	private DateTime date;
	
	private String message;
	
}
