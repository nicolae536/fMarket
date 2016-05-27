package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.model.demand.Demand;
import ro.fmarket.model.demand.SelfDemandDTO;

public class SelfDemandConverter {

	public static SelfDemandDTO toDTO(Demand demand) {
		final SelfDemandDTO dto = new SelfDemandDTO();
		dto.setId(demand.getId());
		//TODO
		return dto;
	}
	
	public static List<SelfDemandDTO> toDTOList(List<Demand> demands) {
		final List<SelfDemandDTO> result = new ArrayList<>();
		for (Demand d : demands) {
			result.add(toDTO(d));
		}
		return result;
	}
	
}
