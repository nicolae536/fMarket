package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.demand.DemandAdminDTO;
import ro.fmarket.admin.demand.DemandDetailsDTO;
import ro.fmarket.model.demand.Demand;

public class DemandAdminConverter {

	public static DemandAdminDTO toDTO(Demand demand) {
		final DemandAdminDTO result = new DemandAdminDTO();
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
		
		
		return result;
	}
	
}
