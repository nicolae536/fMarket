package ro.fmarket.model.company;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;
import ro.fmarket.security.FMarketPrincipal;

@RestController
@RequestMapping("/companies")
public class CompanyController {

	@Autowired
	private CompanyService service;

	@RequestMapping(method = RequestMethod.POST)
	public void createCompany(@Valid @RequestBody NewCompanyRequest request) {
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public PaginatedResponse<CompanyDTO> searchCompanies(@Valid @RequestBody CompanySearchObject searchObject) {
		return null;
	}

	@RequestMapping(value = "/details/{id}", method = RequestMethod.GET)
	public CompanyDetailsDTO getCompanyDetails(@PathVariable("id") Integer id) {
		return null;
	}

	@RequestMapping(value = "/review/stars", method = RequestMethod.POST)
	public void addStarsReview(@Valid @RequestBody NewCompanyStarsReview request, @AuthenticationPrincipal FMarketPrincipal principal) {

	}

	@RequestMapping(value = "/review/message", method = RequestMethod.POST)
	public void addMessageReview(@Valid @RequestBody NewCompanyMessageReview request, @AuthenticationPrincipal FMarketPrincipal principal) {

	}

}
