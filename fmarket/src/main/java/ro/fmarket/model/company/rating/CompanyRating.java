package ro.fmarket.model.company.rating;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;
import ro.fmarket.model.company.Company;

@Data
@Entity
public class CompanyRating extends BaseEntity {

	@OneToOne(mappedBy = "rating", fetch = FetchType.LAZY)
	private Company company;
	
	/**
	 * reviews nr
	 */
	@Min(0)
	@Column(nullable = false)
	private Integer votes;

	/**
	 * Sum of stars
	 */
	@Min(0)
	@Column(nullable = false)
	private Integer score;
	
	

}
