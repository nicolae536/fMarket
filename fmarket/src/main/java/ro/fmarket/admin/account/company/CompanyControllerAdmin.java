package ro.fmarket.admin.account.company;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ro.fmarket.core.exception.InternalErrorException;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.NewCompanyRequest;

@RestController
@RequestMapping("/admin/companies")
public class CompanyControllerAdmin {

	@Autowired
	private CompanyServiceAdmin service;
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public PaginatedResponse<CompanyListItemAdmin> searchCompanies(@Valid @RequestBody CompanySearchObject searchObject) {
		return service.searchCompanies(searchObject);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void createCompany(@Valid @RequestBody NewCompanyRequest request) {
		service.createCompany(request);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	public void editCompany(@Valid @RequestBody UpdateCompanyRequest request) {
		service.updateCompany(request);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.GET)
	public CompanyDetailsAdminDTO getCompanyDetails(@PathVariable("id") Integer id) {
		return service.getCompanyDetails(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteCompany(@PathVariable("id") Integer id) {
		service.deleteCompany(id);
	}
	
	@RequestMapping(value = "/logo/{id}", method = RequestMethod.POST)
	public void changeCompanyLogo(@PathVariable("id") Integer id, @RequestParam("logo") MultipartFile file) {
		System.out.println("NAME: " + file.getOriginalFilename());
		file.getName();
		try {
			file.getBytes();
		} catch (IOException e) {
			throw new InternalErrorException();
		}
		file.getOriginalFilename();
		
	}

}
