package ro.fmarket.admin.account.company;

import ro.fmarket.core.rest.PaginatedResponse;

public interface CompanyServiceAdmin {

	PaginatedResponse<CompanyListItemAdmin> searchCompanies(CompanySearchObject searchObject);
	
	void createCompany(NewCompanyRequest request);
	
	void updateCompany(UpdateCompanyRequest request);
	
	void deleteCompany(int id);
	
	CompanyDetailsAdminDTO getCompanyDetails(int id);
	
	void updateCompanyLogo(int companyId, String fileName, int size, byte[] photo);
	
}
