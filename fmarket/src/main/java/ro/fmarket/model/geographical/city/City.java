package ro.fmarket.model.geographical.city;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.geographical.county.County;

@Data
@Entity
public class City extends BaseEntity {

	@Column(nullable = false, length = 30, unique = true)
	private String name;

	@ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private County county;
}
