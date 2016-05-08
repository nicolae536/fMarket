package ro.fmarket.admin.account.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.CompanyAdminConverter;
import ro.fmarket.core.exception.NotFoundException;
import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.company.Company;
import ro.fmarket.model.company.CompanyDao;
import ro.fmarket.model.company.NewCompanyRequest;

@Service
@Transactional
public class CompanyServiceAdminImpl implements CompanyServiceAdmin {

	@Autowired
	private CompanyDao companyDao;
	
	@Override
	public PaginatedResponse<CompanyListItem> searchCompanies(CompanySearchObject searchObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void createCompany(NewCompanyRequest request) {
		Company newCompany = createNewCompany(request);
		companyDao.save(newCompany);
		
	}

	@Override
	public void updateCompany(UpdateCompanyRequest request) {
		// TODO Auto-generated method stub
		Company company = companyDao.get(request.getId());
		if (company == null) {
			throw new NotFoundException("Company");
		}
		updateCompany(company, request);
		companyDao.update(company);
		
	}

	@Override
	public void deleteCompany(int id) {
		companyDao.deleteById(id);
	}

	@Override
	public CompanyAdminDTO getCompanyDetails(int id) {
		final Company company = companyDao.get(id);
		return CompanyAdminConverter.toDTO(company);
	}
	
	private Company createNewCompany(NewCompanyRequest request) {
		final Company company = new Company();
		
		return company;
	}
	
	private void updateCompany(Company company, UpdateCompanyRequest request) {
	}

}
