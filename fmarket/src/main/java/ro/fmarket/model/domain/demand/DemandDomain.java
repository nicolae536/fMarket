package ro.fmarket.model.domain.demand;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;

@Data
@Entity
@EqualsAndHashCode(callSuper = false, exclude = "companies")
@JsonIgnoreProperties({"companies"})
public class DemandDomain extends BaseEntity {

	@Column(length = 30, nullable = false)
	private String name;
	
	@ManyToMany(mappedBy = "demandDomains", fetch = FetchType.LAZY)
	private Set<Company> companies = new HashSet<>();
	
}
