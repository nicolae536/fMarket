package ro.fmarket.admin.account.company;

import org.joda.time.DateTime;

import lombok.Data;

@Data
public class CompanyListItem {

	private int id;
	private String email;
	private String name;
	private String companyDomain;
	private DateTime creationDate;

}
