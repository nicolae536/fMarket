package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.model.menu.DomainMenuItem;
import ro.fmarket.model.menu.DomainMenuItemDTO;

public class DomainMenuItemConverter {

	public static DomainMenuItemDTO toDTO(DomainMenuItem item) {
		final DomainMenuItemDTO dto = new DomainMenuItemDTO();
		dto.setId(item.getId());
		dto.setLevel(item.getLevel());
		dto.setName(item.getName());
		dto.setOrderNr(item.getOderNr());
		if (item.getParent() != null) {
			dto.setParentId(item.getParent().getId());
		}
		if (item.getDomain() != null) {
			dto.setDomainId(item.getDomain().getId());
		}
		return dto;
	}

	public static List<DomainMenuItemDTO> toDTO(List<DomainMenuItem> items) {
		final List<DomainMenuItemDTO> result = new ArrayList<>();
		for (DomainMenuItem item : items) {
			result.add(toDTO(item));
		}
		return result;
	}

}
