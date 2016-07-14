package ro.fmarket.model.domain.company;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company/domains")
public class CompanyDomainController {

	@Autowired
	private CompanyDomainService service;

	@RequestMapping(method = RequestMethod.POST)
	public void addCompanyDomain(@Valid @RequestBody NewCompanyDomainRequest request) {
		service.addDomain(request.getName());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteCompanyDomain(@PathVariable("id") Integer id) {
		service.deleteDomain(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void editDomain(@Valid @RequestBody CompanyDomainUpdateRequest request) {
		service.updateDomain(request.getId(), request.getNewName());
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<CompanyDomainDTO> getDomains() {
		return service.getAll();
	}

}
