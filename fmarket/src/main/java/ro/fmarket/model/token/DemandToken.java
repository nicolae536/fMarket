package ro.fmarket.model.token;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.model.demand.Demand;

@Data
@Entity
public class DemandToken extends TokenEntity {

	@ManyToOne(optional = false)
	private Demand demand;

}
