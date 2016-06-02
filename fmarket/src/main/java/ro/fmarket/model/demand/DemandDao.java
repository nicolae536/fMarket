package ro.fmarket.model.demand;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.stereotype.Repository;

import ro.fmarket.admin.demand.DemandSearchObject;
import ro.fmarket.core.base.BaseDao;
import ro.fmarket.core.constants.PaginationConstants;
import ro.fmarket.model.demand.consts.DemandStatus;

@Repository
public class DemandDao extends BaseDao<Demand> {

	public DemandDao() {
		super(Demand.class);
	}

	@SuppressWarnings("unchecked")
	public List<Demand> getDemandsForAccount(int accountId) {
		final Criteria criteria = getCriteria();
//		criteria.createAlias("account", "acc");
		criteria.add(Restrictions.eq("acc.id", accountId));
		criteria.addOrder(Order.desc("creationDate"));

		return criteria.list();
	}

	public void updateAllWaitingForReviewDemands() {
		String hql = "update Demand set status = :newStatus where status = :oldStatus";
		Query query = getSession().createQuery(hql);
		query.setParameter("oldStatus", DemandStatus.WAITING_FOR_REVIEW);
		query.setParameter("newStatus", DemandStatus.IN_REVIEW);
		query.executeUpdate();
	}

	public int getWaitingForReviewDemandsCount() {
		String hql = "select count(d.id) from Demand d where d.status = :status";
		Query query = getSession().createQuery(hql);
		query.setParameter("status", DemandStatus.WAITING_FOR_REVIEW);
		Long count = (Long) query.uniqueResult();
		return count.intValue();
	}

	@SuppressWarnings("unchecked")
	public List<Demand> getDemandsByStatuses(DemandStatus... statuses) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.in("status", statuses));
		criteria.addOrder(Order.desc("creationDate"));
		return criteria.list();
	}

	public Criteria createCriteriaForDemands(DemandSearchObject searchObject) {
		Criteria criteria = getCriteria();
		if (searchObject.getAccountId() != null) {
			// criteria.createAlias("account", "acc"); // TODO check if works
			criteria.add(Restrictions.eq("account.id", searchObject.getAccountId()));
		}
		if (searchObject.getDomainId() != null) {
			// criteria.createAlias("demand", "dem");
			criteria.add(Restrictions.eq("demand.id", searchObject.getDomainId()));
		}
		if (searchObject.getStatus() != null) {
			criteria.add(Restrictions.eq("status", searchObject.getStatus()));
		}
		return criteria;
	}

	public int getCriteriaTotalCount(Criteria criteria) {
		criteria.setProjection(Projections.rowCount());
		return (int)(long)criteria.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<Demand> searchDemands(Criteria criteria, int page) {
		criteria.setMaxResults(PaginationConstants.DEMANDS_PAGE_SIZE);
		criteria.setFirstResult((page - 1) * PaginationConstants.DEMANDS_PAGE_SIZE);
		return criteria.list();
	}

}
