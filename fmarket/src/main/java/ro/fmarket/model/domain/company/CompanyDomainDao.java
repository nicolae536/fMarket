package ro.fmarket.model.domain.company;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CompanyDomainDao extends BaseDao<CompanyDomain>{

	public CompanyDomainDao() {
		super(CompanyDomain.class);
	}

}
