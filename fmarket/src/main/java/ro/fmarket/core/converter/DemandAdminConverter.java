package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.demand.DemandAdminDTO;
import ro.fmarket.model.demand.Demand;

public class DemandAdminConverter {

	public static DemandAdminDTO toDTO(Demand domain) {
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
	
}
