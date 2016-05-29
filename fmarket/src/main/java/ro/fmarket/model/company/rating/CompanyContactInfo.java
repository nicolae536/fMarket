package ro.fmarket.model.company.rating;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;
import ro.fmarket.model.geographical.city.City;

@Data
@Entity
public class CompanyContactInfo extends BaseEntity {

	private String phone;
	private String address;
	private String contactPerson;
	private String email;

	@ManyToOne(optional = false)
	private City city;
}
