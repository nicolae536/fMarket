package ro.fmarket.admin.demand;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class DemandDao extends BaseDao<Demand>{

	public DemandDao() {
		super(Demand.class);
	}

}
