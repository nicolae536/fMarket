package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.model.domain.demand.DemandDomain;
import ro.fmarket.model.domain.demand.DemandDomainDTO;

public class DemandDomainConverter {

	public static DemandDomainDTO toDTO(DemandDomain domain) {
		final DemandDomainDTO result = new DemandDomainDTO();
		result.setId(domain.getId());
		result.setName(domain.getName());
		//TODO
		return result;
	}

	public static List<DemandDomainDTO> toDTOList(List<DemandDomain> domains) {
		final List<DemandDomainDTO> result = new ArrayList<>();
		for (DemandDomain d : domains) {
			result.add(toDTO(d));
		}
		return result;
	}
	
}
