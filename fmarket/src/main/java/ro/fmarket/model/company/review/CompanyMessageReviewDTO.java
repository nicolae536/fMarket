package ro.fmarket.model.company.review;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class CompanyMessageReviewDTO {

	private DateTime date;
	
	private String message;
	
	private String name;
	
}
