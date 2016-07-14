package ro.fmarket.model.geographical.county;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@Entity
public class County extends BaseEntity {

	@Column(nullable = false, length = 30, unique = true)
	private String name;
	
}
