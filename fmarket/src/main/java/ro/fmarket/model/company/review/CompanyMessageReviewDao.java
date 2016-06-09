package ro.fmarket.model.company.review;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CompanyMessageReviewDao extends BaseDao<CompanyMessageReview>{

	public CompanyMessageReviewDao() {
		super(CompanyMessageReview.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<CompanyMessageReview> getForCompany(int id) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("company.id", id));
		criteria.addOrder(Order.desc("dateInserted"));
		return criteria.list();
	}
	
}
