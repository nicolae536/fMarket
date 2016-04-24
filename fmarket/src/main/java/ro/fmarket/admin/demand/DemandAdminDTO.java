package ro.fmarket.admin.demand;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.model.demand.consts.DemandStatus;

@Data
public class DemandAdminDTO {

	private int id;
	
	private String title;
	
	private int accountId;
	
	private DateTime creationDate;
	
	private DemandStatus status;
	
}
