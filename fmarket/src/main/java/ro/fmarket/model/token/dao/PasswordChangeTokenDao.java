package ro.fmarket.model.token.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;
import ro.fmarket.model.token.PasswordChangeToken;

@Repository
public class PasswordChangeTokenDao extends BaseDao<PasswordChangeToken> {

	public PasswordChangeTokenDao() {
		super(PasswordChangeToken.class);
	}

	@SuppressWarnings("unchecked")
	public PasswordChangeToken getByToken(String token) {
		final Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("token", token));
		List<PasswordChangeToken> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}
	
    public void deleteAllTokensForAccount(int accountId) {
        final String hql = "delete from PasswordChangeToken where account.id = :id";
        getSession().createQuery(hql).setInteger("id", accountId).executeUpdate();
    }
}
