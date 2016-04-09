package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.model.domain.company.CompanyDomain;
import ro.fmarket.model.domain.company.CompanyDomainDTO;

public class CompanyDomainConverter {

	public static CompanyDomainDTO toDTO(CompanyDomain domain) {
		final CompanyDomainDTO result = new CompanyDomainDTO();
		result.setId(domain.getId());
		result.setName(domain.getName());
		//TODO
		return result;
	}

	public static List<CompanyDomainDTO> toDTOList(List<CompanyDomain> domains) {
		final List<CompanyDomainDTO> result = new ArrayList<>();
		for (CompanyDomain d : domains) {
			result.add(toDTO(d));
		}
		return result;
	}

}
