package ro.fmarket.core.base;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Data;

@Data
@MappedSuperclass
public class BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private Integer id;
	
}
