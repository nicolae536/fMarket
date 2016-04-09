package ro.fmarket.model.domain.demand;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class DemandDomainDao extends BaseDao<DemandDomain> {

	public DemandDomainDao() {
		super(DemandDomain.class);
	}

}
