package ro.fmarket.admin.demand;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.model.account.consts.AccountStatus;
import ro.fmarket.model.domain.demand.DemandDomain;

@Data
public class DemandDetailsDTO {

	private int id;
	private String title;
	private String message;
	private List<String> cities = new ArrayList<>();
	private boolean allCities;
	private boolean phoneContact;
	private DateTime creationDate;
	private DateTime activationDate;
	private DemandDomain domain;
	
	/* Account */
	
	private int accountId;
	private String accountEmail;
	private AccountStatus accountStatus;
	private int demandsCount;
	
	
}
