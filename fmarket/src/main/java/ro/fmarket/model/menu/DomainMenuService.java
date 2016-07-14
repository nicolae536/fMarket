package ro.fmarket.model.menu;

import java.util.List;

public interface DomainMenuService {

	List<DomainMenuItemDTO> getMenu();
	
	void addMenuItem(NewDomainMenuItemRequest request);
	
	void deleteMenuItem(int id);
	
	void updateMenuItem(UpdateDomainMenuItemRequest request);
}
