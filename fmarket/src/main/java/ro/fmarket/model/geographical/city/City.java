package ro.fmarket.model.geographical.city;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.geographical.county.County;

@Data
@Entity
public class City extends BaseEntity {

	@Column(nullable = false, length = 20)
	private String name;

	@ManyToOne(optional = false)
	private County county;
}
