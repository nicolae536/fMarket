package ro.fmarket.admin.account.company;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.NewCompanyRequest;

@Service
@Transactional
public class CompanyServiceAdminImpl implements CompanyServiceAdmin {

	@Override
	public PaginatedResponse<CompanyListItem> searchCompanies(CompanySearchObject searchObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void createCompany(NewCompanyRequest request) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateCompany(UpdateCompanyRequest request) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCompany(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public CompanyDetailsDTO getCompanyDetails(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
