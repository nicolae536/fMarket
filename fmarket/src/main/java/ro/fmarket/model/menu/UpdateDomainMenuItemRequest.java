package ro.fmarket.model.menu;

import lombok.Data;

@Data
public class UpdateDomainMenuItemRequest {

	private Integer id;
	
	private String newName;
	
	private Integer orderNr;
	
}
