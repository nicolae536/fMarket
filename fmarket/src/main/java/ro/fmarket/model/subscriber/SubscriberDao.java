package ro.fmarket.model.subscriber;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.admin.subscriber.SubscriberSearchObject;
import ro.fmarket.admin.subscriber.SubscriberSortKey;
import ro.fmarket.core.base.BaseDao;
import ro.fmarket.core.constants.PaginationConstants;

@Repository
public class SubscriberDao extends BaseDao<Subscriber> {

	public SubscriberDao() {
		super(Subscriber.class);
	}

	@SuppressWarnings("unchecked")
	public Subscriber getByEmail(String email) {
		final String hql = "from Subscriber where email = :email";
		final Query query = getSession().createQuery(hql);
		query.setParameter("email", email);
		List<Subscriber> list = query.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Subscriber> searchSubscribers(Criteria criteria, Integer page) {
		criteria.setMaxResults(PaginationConstants.SUBSCRIBERS_PAGE_SIZE);
		criteria.setFirstResult((page - 1) * PaginationConstants.SUBSCRIBERS_PAGE_SIZE);
		return criteria.list();
	}

	public Criteria createSubscribersCriteria(SubscriberSearchObject searchObject) {
		final Criteria criteria = getCriteria();
		if (searchObject.getId() != null) {
			criteria.add(Restrictions.eq("id", searchObject.getId()));
		}
		if (searchObject.getEmail() != null) {
			criteria.add(Restrictions.ilike("email", "%" + searchObject.getEmail() + "%"));
		}
		String sortKey = getSortKey(searchObject.getSortKey());
		if (sortKey != null) {
			boolean desc = searchObject.getDesc() != null && searchObject.getDesc();
			if (desc) {
				criteria.addOrder(Order.desc(sortKey));
			} else {
				criteria.addOrder(Order.asc(sortKey));
			}
		}
		return criteria;
	}

	public Long getCriteriaTotalCount(Criteria criteria) {
		criteria.setProjection(Projections.rowCount());
		return (Long) criteria.uniqueResult();
	}

	private String getSortKey(SubscriberSortKey sortKey) {
		if (sortKey == null) {
			return null;
		}
		switch (sortKey) {
		case EMAIL:
			return "email";
		case SUBSCRIBE_DATE:
			return "subscribeDate";
		case UNSUBSCRIBE_DATE:
			return "unsubscribeDate";
		}
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public Subscriber getSubscriberByToken(String token) {
		final String hql = "from Subscriber where unsubscribeToken = :token";
		final Query query = getSession().createQuery(hql);
		query.setParameter("token", token);
		List<Subscriber> list = query.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}
}
