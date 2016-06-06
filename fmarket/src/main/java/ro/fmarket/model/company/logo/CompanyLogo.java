package ro.fmarket.model.company.logo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;

@Entity
@Data
public class CompanyLogo extends BaseEntity {

	@OneToOne(optional = false)
	@JoinColumn(unique = true)
	private Company company;
	
	@Column(nullable = false, length = 30)
	private String name;
	
	@Column(nullable = false, length = 100000)
	private byte[] file;
	
	@Column(nullable = false)
	private int size;
	
}
