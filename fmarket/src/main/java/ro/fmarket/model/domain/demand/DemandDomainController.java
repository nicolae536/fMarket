package ro.fmarket.model.domain.demand;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController("/demand/domains")
public class DemandDomainController {

	@Autowired
	private DemandDomainService service;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addDomain(@Valid @RequestBody NewDemandDomainRequest request) {
		service.addDomain(request.getName());
	}

	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	public void deleteDomain(@PathVariable("id") Integer id) {
		service.deleteDomain(id);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT)
	public void editDomain(@Valid @RequestBody DemandDomainUpdateRequest request) {
		service.updateDomain(request.getId(), request.getNewName());
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<DemandDomainDTO> getAll() {
		return service.getAll();
	}
}
