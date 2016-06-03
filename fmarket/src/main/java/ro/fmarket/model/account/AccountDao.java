package ro.fmarket.model.account;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.admin.account.user.UserSearchObject;
import ro.fmarket.core.base.BaseDao;
import ro.fmarket.core.constants.PaginationConstants;
import ro.fmarket.model.account.consts.AccountType;

@Repository
public class AccountDao extends BaseDao<Account> {

	public AccountDao() {
		super(Account.class);
	}

	@SuppressWarnings("unchecked")
	public Account getByEmail(String email) {
		final String hql = "from Account where email = :email";
		final Query query = getSession().createQuery(hql);
		query.setParameter("email", email);
		List<Account> list = query.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}
	
	@SuppressWarnings("unchecked")
	public Account getActiveByEmail(String email) {
		final String hql = "from Account a where a.email = :email and a.status = 'ACTIVE'";
		final Query query = getSession().createQuery(hql);
		query.setParameter("email", email);
		List<Account> list = query.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Account> searchUsers(Criteria criteria, int page) {
		criteria.setMaxResults(PaginationConstants.ACCOUNTS_PAGE_SIZE);
		criteria.setFirstResult((page - 1) * PaginationConstants.ACCOUNTS_PAGE_SIZE);
		return criteria.list();
	}

	public Criteria createUserCriteria(UserSearchObject searchObject) {
		final Criteria criteria = getCriteria();

		boolean accountDetailsJoin = false;

		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		criteria.add(Restrictions.eq("type", AccountType.USER));
		if (searchObject.getCityId() != null) {
			criteria.createAlias("accountDetails", "details");
			accountDetailsJoin = true;
			criteria.createAlias("details.city", "c");
			criteria.add(Restrictions.eq("c.id", searchObject.getCityId()));
		}
		if (searchObject.getEmail() != null) {
			if (!accountDetailsJoin) {
				criteria.createAlias("accountDetails", "details");
			}
			criteria.add(Restrictions.eq("details.name", searchObject.getEmail()));
		}
		if (searchObject.getId() != null) {
			criteria.add(Restrictions.eq("id", searchObject.getId()));
		}
		if (searchObject.getStatus() != null) {
			criteria.add(Restrictions.eq("status", searchObject.getStatus()));
		}
		return criteria;
	}
	
	public Long getCriteriaTotalCount(Criteria criteria) {
		criteria.setProjection(Projections.rowCount());
		return (Long) criteria.uniqueResult();
	}
	
}
