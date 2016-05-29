package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.account.company.CompanyAdminDTO;
import ro.fmarket.model.company.Company;
import ro.fmarket.model.company.rating.CompanyContactInfo;

public class CompanyAdminConverter {

	public static CompanyAdminDTO toDTO(Company company) {
		CompanyAdminDTO result = new CompanyAdminDTO();
		result.setId(company.getId());
		result.setName(company.getName());
		result.setEmail(company.getAccount().getEmail());
		CompanyContactInfo contactInfo = company.getContactInfo();
		result.setAddress(contactInfo.getAddress());
		result.setPhone(contactInfo.getPhone());
		result.setEmail(contactInfo.getEmail());
		return result;
	}
	
	public static List<CompanyAdminDTO> toDTOList(List<Company> companies) {
		List<CompanyAdminDTO> result = new ArrayList<>();
		for (Company c : companies) {
			result.add(toDTO(c));
		}
		return result;
	}
	
}
