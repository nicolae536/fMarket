package ro.fmarket.model.geographical.city;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.demand.Demand;

@Data
@Entity
public class DemandCity extends BaseEntity {

	@ManyToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Demand demand;
	
	@ManyToOne(optional = false, cascade = CascadeType.ALL)
	private City city;
	
}
