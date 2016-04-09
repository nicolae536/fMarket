package ro.fmarket.model.domain.company;

import java.util.List;

public interface CompanyDomainService {

	List<CompanyDomainDTO> getAll();

	void addDomain(String name);

	void deleteDomain(Integer id);
	
	void updateDomain(Integer id, String newName);

}
