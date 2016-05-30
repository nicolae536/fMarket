package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.account.company.CompanyListItemAdmin;
import ro.fmarket.model.company.Company;

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
	
}
