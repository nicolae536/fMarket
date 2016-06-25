package ro.fmarket.model.domain.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.converter.CompanyDomainConverter;

@Service
@Transactional
public class CompanyDomainServiceImpl implements CompanyDomainService {

	@Autowired
	private CompanyDomainDao dao;

	@Override
	public List<CompanyDomainDTO> getAll() {
		return dao.getAllWithCompaniesCount();
//		return CompanyDomainConverter.toDTOList(dao.getList());
	}

	@Override
	public void addDomain(String name) {
		final CompanyDomain newDomain = createNewDomain(name);
		dao.save(newDomain);
	}

	@Override
	public void deleteDomain(Integer id) {
		dao.deleteById(id);
	}

	@Override
	public void updateDomain(Integer id, String newName) {
		CompanyDomain domain = dao.get(id);
		if (domain != null) {
			domain.setName(newName);
			dao.save(domain);
		}

	}

	private CompanyDomain createNewDomain(String name) {
		final CompanyDomain result = new CompanyDomain();
		result.setName(name);
		return result;
	}
}
