package ro.fmarket.model.menu;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menu/domain")
public class DomainMenuController {

	@Autowired
	private DomainMenuService service;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<DomainMenuItemDTO> getMenu() {
		return service.getMenu();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public void addMenuItem(@Valid @RequestBody NewDomainMenuItemRequest request) {
		service.addMenuItem(request);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	public void deleteMenuItem(@PathVariable("id") Integer id) {
		service.deleteMenuItem(id);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public void updateMenuItem(@Valid @RequestBody UpdateDomainMenuItemRequest request) {
		service.updateMenuItem(request);
	}
	
}
