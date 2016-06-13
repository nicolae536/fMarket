package ro.fmarket.model.company;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.model.company.review.CompanyMessageReviewDTO;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;
import ro.fmarket.security.FMarketPrincipal;

@RestController
@RequestMapping("/companies")
public class CompanyController {

	@Autowired
	private CompanyService service;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public CompanyDetailsDTO getCompanyDetails(@PathVariable("id") Integer id) {
		return service.getCompanyDetails(id);
	}

	@RequestMapping(value = "/review/stars", method = RequestMethod.POST)
	public void addStarsReview(@Valid @RequestBody NewCompanyStarsReview request, @AuthenticationPrincipal FMarketPrincipal principal) {
		service.addStarsReview(principal.getAccountId(), request);
	}

	@RequestMapping(value = "/review/message", method = RequestMethod.POST)
	public void addMessageReview(@Valid @RequestBody NewCompanyMessageReview request, @AuthenticationPrincipal FMarketPrincipal principal) {
		service.addMessageReview(principal.getAccountId(), request);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<FullDomainDTO> getCompaniesGroupedByDomain(@RequestParam("p") String domainName) {
		return service.getCompaniesGroupedByDomain(domainName);
	}
	
	@RequestMapping(value = "/logo/{id}", produces = MediaType.IMAGE_JPEG_VALUE, method = RequestMethod.GET)
	public byte[] getCompanyLogo(@PathVariable("id") Integer id) {
		return service.getLogo(id);
	}

	@RequestMapping(value = "/reviews/{id}", method = RequestMethod.GET)
	public List<CompanyMessageReviewDTO> getCompanyReviews(@PathVariable("id") Integer companyId) {
		return service.getCompanyReviews(companyId);
	}
}
