package ro.fmarket.model.account;

import javax.persistence.Entity;

import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.geographical.city.City;

@Data
@Entity
public class AccountDetails extends BaseEntity {

	private String name;
	
	private String phone;
	
	private City city;
	
	private City cityFrom;
	
	private DateTime updatedDate;
	
}
