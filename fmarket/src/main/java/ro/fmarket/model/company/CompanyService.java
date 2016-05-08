package ro.fmarket.model.company;

import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

public interface CompanyService {

	CompanyDetailsDTO getCompanyDetails(Integer id);

	void addStarsReview(NewCompanyStarsReview request);

	void createCompany(NewCompanyRequest request);

	void addMessageReview(NewCompanyMessageReview request);

}
