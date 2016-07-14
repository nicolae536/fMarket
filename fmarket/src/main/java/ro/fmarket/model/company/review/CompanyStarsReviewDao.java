package ro.fmarket.model.company.review;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CompanyStarsReviewDao extends BaseDao<CompanyStarsReview>{

	public CompanyStarsReviewDao() {
		super(CompanyStarsReview.class);
	}

	@SuppressWarnings("unchecked")
	public CompanyStarsReview getForAccount(int accountId) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("account.id", accountId));
		List<CompanyStarsReview> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}
}
