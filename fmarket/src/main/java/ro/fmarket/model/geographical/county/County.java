package ro.fmarket.model.geographical.county;

import javax.persistence.Entity;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@Entity
public class County extends BaseEntity {

	private String name;
	
}
