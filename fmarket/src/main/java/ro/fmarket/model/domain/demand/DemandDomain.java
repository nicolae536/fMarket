package ro.fmarket.model.domain.demand;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@Entity
public class DemandDomain extends BaseEntity {

	@Column(length = 30, nullable = false)
	private String name;
	
}
