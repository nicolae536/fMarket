package ro.fmarket.model.domain.company;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = "companies")
public class CompanyDomain extends BaseEntity {

	@Column(length = 40, nullable = false)
	private String name;
	
	@LazyCollection(LazyCollectionOption.EXTRA)
	@OneToMany(mappedBy = "domain")
	private Set<Company> companies = new HashSet<>();
	
}
