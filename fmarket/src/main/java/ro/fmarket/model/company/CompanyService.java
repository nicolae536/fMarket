package ro.fmarket.model.company;

import java.util.List;

import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

public interface CompanyService {

	CompanyDetailsDTO getCompanyDetails(Integer id);

	void addStarsReview(Integer accountId, NewCompanyStarsReview request);

	void createCompany(NewCompanyRequest request);

	void addMessageReview(Integer accountId, NewCompanyMessageReview request);

	List<FullDomainDTO> getCompaniesGroupedByDomain(String name);
}
