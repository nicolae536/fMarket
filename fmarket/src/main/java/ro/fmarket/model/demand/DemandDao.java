package ro.fmarket.model.demand;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class DemandDao extends BaseDao<Demand>{

	public DemandDao() {
		super(Demand.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<Demand> getDemandsForAccount(int accountId) {
		final Criteria criteria = getCriteria();
		criteria.createAlias("account", "acc");
		criteria.add(Restrictions.eq("acc.id", accountId));
		criteria.addOrder(Order.desc("creationDate"));
		
		return criteria.list();
	}

}
