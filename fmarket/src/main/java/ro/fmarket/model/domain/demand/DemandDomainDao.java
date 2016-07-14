package ro.fmarket.model.domain.demand;

import java.util.List;

import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;
import ro.fmarket.model.domain.company.CompanyDomainDTO;

@Repository
public class DemandDomainDao extends BaseDao<DemandDomain> {

	public DemandDomainDao() {
		super(DemandDomain.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<DemandDomainDTO> getAllWithCompaniesCount() {
		String sql = "select d.id as id, d.name as name, d.companies.size as nrOfCompanies from DemandDomain d";
		return getSession()
				.createQuery(sql)
				.setResultTransformer(Transformers.aliasToBean(DemandDomainDTO.class))
				.list();
	}

}
