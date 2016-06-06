package ro.fmarket.model.company;

import java.util.List;

import ro.fmarket.admin.account.company.CompanyDetailsAdminDTO;
import ro.fmarket.model.company.review.NewCompanyMessageReview;
import ro.fmarket.model.company.review.NewCompanyStarsReview;

public interface CompanyService {

	CompanyDetailsAdminDTO getCompanyDetails(int id);

	void addStarsReview(Integer accountId, NewCompanyStarsReview request);

	void addMessageReview(Integer accountId, NewCompanyMessageReview request);

	List<FullDomainDTO> getCompaniesGroupedByDomain(String name);
	
	byte[] getLogo(int companyId);
}
