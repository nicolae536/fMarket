package ro.fmarket.model.menu;

import lombok.Data;

@Data
public class DomainMenuItemDTO {

	private Integer id;
	private String name;
	private Integer parentId;
	private Integer level;
	private Integer orderNr;
	
}
