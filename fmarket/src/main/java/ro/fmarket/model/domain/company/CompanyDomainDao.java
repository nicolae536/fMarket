package ro.fmarket.model.domain.company;

import java.util.List;

import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CompanyDomainDao extends BaseDao<CompanyDomain> {

	public CompanyDomainDao() {
		super(CompanyDomain.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<CompanyDomainDTO> getAllWithCompaniesCount() {
		String sql = "select  d.id as id, d.name as name, count(c.id) as nrOfCompanies from CompanyDomain d join d.companies c";
		return getSession()
				.createQuery(sql)
				.setResultTransformer(Transformers.aliasToBean(CompanyDomainDTO.class))
				.list();
		
	}

}
