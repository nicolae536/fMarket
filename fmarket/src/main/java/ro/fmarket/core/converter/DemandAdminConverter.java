package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import ro.fmarket.admin.demand.DemandAdminDTO;
import ro.fmarket.admin.demand.DemandDetailsDTO;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.geographical.city.DemandCity;

public class DemandAdminConverter {

	public static DemandAdminDTO toDTO(Demand demand) {
		final DemandAdminDTO result = new DemandAdminDTO();
		result.setId(demand.getId());
		result.setTitle(demand.getTitle());
		result.setStatus(demand.getStatus());
		result.setCreationDate(demand.getCreationDate());
		result.setAccountId(demand.getAccount().getId());
		return result;
	}

	public static List<DemandAdminDTO> toDTOList(List<Demand> demands) {
		final List<DemandAdminDTO> result = new ArrayList<>();
		for (Demand d : demands) {
			result.add(toDTO(d));
		}
		return result;
	}

	public static DemandDetailsDTO toDetails(Demand demand) {
		DemandDetailsDTO result = new DemandDetailsDTO();
		result.setId(demand.getId());
		result.setTitle(demand.getTitle());
		result.setAllCities(demand.getAllCities());
		result.setActivationDate(demand.getActivationDate());
		result.setCreationDate(demand.getCreationDate());
		result.setMessage(demand.getMessage());
		result.setCities(convertCitiesToStrings(demand.getCities()));
		result.setDomain(demand.getDomain());
		result.setPhone(demand.getPhone());
		result.setName(demand.getName());
		
		Account account = demand.getAccount();
		result.setAccountEmail(account.getEmail());
		result.setAccountId(account.getId());
		result.setAccountStatus(account.getStatus());
		return result;
	}

	private static List<String> convertCitiesToStrings(Set<DemandCity> cities) {
		final List<String> strings = new ArrayList<>();
		for (DemandCity city : cities) {
			strings.add(city.getCity().getName());
		}
		return strings;
	}

}
