package ro.fmarket.model.company.logo;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import ro.fmarket.core.base.BaseDao;

public class CompanyLogoDao extends BaseDao<CompanyLogo> {

	public CompanyLogoDao() {
		super(CompanyLogo.class);
	}
	
	@SuppressWarnings("unchecked")
	public CompanyLogo getByCompany(int companyId) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("company.id", companyId));
		List<CompanyLogo> list = criteria.list();
		if (list.isEmpty()) {
			return null;
		} else {
			return list.get(0);
		}
	}

}
