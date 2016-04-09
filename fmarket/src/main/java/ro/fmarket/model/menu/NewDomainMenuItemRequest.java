package ro.fmarket.model.menu;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class NewDomainMenuItemRequest {

	@NotBlank
	private String name;
	
	private Integer parentId;
	
	private Integer orderNr;
	
	/**
	 * Frunze
	 */
	private Integer domainId;
	
}
