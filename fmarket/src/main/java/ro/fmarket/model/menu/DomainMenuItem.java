package ro.fmarket.model.menu;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.domain.demand.DemandDomain;

@Data
@Entity
public class DomainMenuItem extends BaseEntity {

	@Column(nullable = false, length = 30)
	private String name;

	@Column(nullable = false)
	private Integer level;
	
	@Column(nullable = false)
	private Integer oderNr;

	@ManyToOne
	private DomainMenuItem parent;

	/**
	 * optional. frunzele trebuie sa aiba.
	 */
	@OneToOne
	private DemandDomain domain;

	@OrderBy("orderNr")
	@OneToMany(mappedBy = "parent", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
	private Set<DomainMenuItem> children = new HashSet<>();

}
