package ro.fmarket.model.token.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;
import ro.fmarket.model.token.DemandAccessToken;
import ro.fmarket.model.token.DemandToken;

@Repository
public class DemandAccessTokenDao extends BaseDao<DemandAccessToken>{

	public DemandAccessTokenDao() {
		super(DemandAccessToken.class);
	}

	@SuppressWarnings("unchecked")
	public DemandAccessToken getByToken(String token) {
		final Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("token", token));
		List<DemandAccessToken> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}
}
