package ro.fmarket.model.demand;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class SelfDemandDTO {

	private int id;
	
	private DemandStatus status;
	
	private String title;
	
	private String domain;
	
	private String message;
	
	private DateTime creationDate;
}
