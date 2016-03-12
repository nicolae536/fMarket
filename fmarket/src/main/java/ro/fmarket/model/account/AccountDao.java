package ro.fmarket.model.account;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class AccountDao extends BaseDao<Account> {

	public AccountDao() {
		super(Account.class);
	}

	@SuppressWarnings("unchecked")
	public Account getByEmail(String email) {
		final String hql = "select Account where email = :email";
		final Query query = getSession().createQuery(hql);
		query.setParameter("email", email);
		List<Account> list = query.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

}
