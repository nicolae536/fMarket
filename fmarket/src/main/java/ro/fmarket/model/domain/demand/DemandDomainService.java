package ro.fmarket.model.domain.demand;

import java.util.List;

public interface DemandDomainService {

	List<DemandDomainDTO> getAll();

	void addDomain(String name);

	void deleteDomain(Integer id);
	
	void updateDomain(Integer id, String newName);
	
}
