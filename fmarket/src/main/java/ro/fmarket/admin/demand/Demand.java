package ro.fmarket.admin.demand;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.domain.demand.DemandDomain;

@Data
public class Demand extends BaseEntity {

	private String text;

	private Account account;
	
	private DemandDomain domain;

	private DemandStatus status;

	private Boolean fromAllCities;

	private DateTime createDate;

	private DateTime closeDate;
	
	private Integer orderNr;
}
