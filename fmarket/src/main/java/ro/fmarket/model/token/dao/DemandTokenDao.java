package ro.fmarket.model.token.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;
import ro.fmarket.model.token.DemandToken;

@Repository
public class DemandTokenDao extends BaseDao<DemandToken> {

	public DemandTokenDao() {
		super(DemandToken.class);
	}

	@SuppressWarnings("unchecked")
	public DemandToken getByToken(String token) {
		final Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("token", token));
		List<DemandToken> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

}
