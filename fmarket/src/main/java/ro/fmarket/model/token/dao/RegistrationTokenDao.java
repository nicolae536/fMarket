package ro.fmarket.model.token.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;
import ro.fmarket.model.token.RegistrationToken;

@Repository
public class RegistrationTokenDao extends BaseDao<RegistrationToken>{

	public RegistrationTokenDao() {
		super(RegistrationToken.class);
	}
	
	@SuppressWarnings("unchecked")
	public RegistrationToken getByToken(String token) {
		final Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("token", token));
		List<RegistrationToken> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

}
