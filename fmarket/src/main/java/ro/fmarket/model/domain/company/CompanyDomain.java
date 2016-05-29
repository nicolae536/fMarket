package ro.fmarket.model.domain.company;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = "companies")
public class CompanyDomain extends BaseEntity {

	@Column(length = 30, nullable = false)
	private String name;
	
	@OneToMany(mappedBy = "domain")
	private Set<Company> companies = new HashSet<>();
	
}
