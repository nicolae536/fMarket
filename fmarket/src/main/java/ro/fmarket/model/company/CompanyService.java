package ro.fmarket.model.company;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

public interface CompanyService {

	PaginatedResponse<CompanyDTO> searchCompanies(CompanySearchObject searchObject);

	CompanyDetailsDTO getCompanyDetails(Integer id);

	void addStarsReview(NewCompanyStarsReview request);

	void createCompany(NewCompanyRequest request);

	void addMessageReview(NewCompanyMessageReview request);

}
