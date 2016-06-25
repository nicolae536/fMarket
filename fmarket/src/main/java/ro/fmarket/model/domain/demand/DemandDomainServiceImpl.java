package ro.fmarket.model.domain.demand;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.DemandDomainConverter;

@Service
@Transactional
public class DemandDomainServiceImpl implements DemandDomainService {

	@Autowired
	private DemandDomainDao dao;
	
	@Override
	public List<DemandDomainDTO> getAll() {
		return dao.getAllWithCompaniesCount();
//		return DemandDomainConverter.toDTOList(dao.getList());
	}

	@Override
	public void addDomain(String name) {
		final DemandDomain newDomain = createNewDomain(name);
		dao.save(newDomain);
		
	}

	@Override
	public void deleteDomain(Integer id) {
		dao.deleteById(id);
		
	}

	@Override
	public void updateDomain(Integer id, String newName) {
		DemandDomain domain = dao.get(id);
		if (domain != null) {
			domain.setName(newName);
			dao.save(domain);
		}
	}
	
	private DemandDomain createNewDomain(String name) {
		final DemandDomain domain = new DemandDomain();
		domain.setName(name);
		return domain;
	}

}
