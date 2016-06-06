package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.account.company.CompanyDetailsAdminDTO;
import ro.fmarket.admin.account.company.CompanyListItemAdmin;
import ro.fmarket.model.company.Company;
import ro.fmarket.model.company.rating.CompanyContactInfo;

public class CompanyAdminConverter {

	public static CompanyListItemAdmin toListItem(Company company) {
		CompanyListItemAdmin result = new CompanyListItemAdmin();
		result.setAccountId(company.getAccount().getId());
		result.setId(company.getId());
		result.setName(company.getName());
		result.setEmail(company.getAccount().getEmail());
		result.setCompanyDomain(company.getDomain().getName());
		return result;
	}
	
	public static List<CompanyListItemAdmin> toListItems(List<Company> companies) {
		List<CompanyListItemAdmin> result = new ArrayList<>();
		for (Company c : companies) {
			result.add(toListItem(c));
		}
		return result;
	}
	
	public static CompanyDetailsAdminDTO toDetails(Company company) {
		CompanyDetailsAdminDTO result = new CompanyDetailsAdminDTO();
		
		CompanyContactInfo contactInfo = company.getContactInfo();
		result.setPhone(contactInfo.getPhone());
		result.setAddress(contactInfo.getAddress());
		result.setContactPerson(contactInfo.getContactPerson());
		result.setCity(contactInfo.getCity().getName());
		result.setCreationDate(result.getCreationDate());
		result.setCompanyDomain(company.getDomain().getName());
		result.setName(company.getName());
		return result;
	}
	
}
