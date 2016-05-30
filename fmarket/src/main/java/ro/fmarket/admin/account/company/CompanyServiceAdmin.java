package ro.fmarket.admin.account.company;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.NewCompanyRequest;

public interface CompanyServiceAdmin {

	PaginatedResponse<CompanyListItemAdmin> searchCompanies(CompanySearchObject searchObject);
	
	void createCompany(NewCompanyRequest request);
	
	void updateCompany(UpdateCompanyRequest request);
	
	void deleteCompany(int id);
	
//	CompanyAdminDTO getCompanyDetails(int id);
	
}
