package ro.fmarket.model.company;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.admin.account.company.CompanySearchObject;
import ro.fmarket.core.base.BaseDao;
import ro.fmarket.core.constants.PaginationConstants;

@Repository
public class CompanyDao extends BaseDao<Company> {

	public CompanyDao() {
		super(Company.class);
	}

	@SuppressWarnings("unchecked")
	public List<String> getByDomainFromAllCities(int demandDomainId) {
		Criteria criteria = getCriteria();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		criteria.createAlias("demandDomains", "dd");
		criteria.add(Restrictions.eq("dd.id", demandDomainId));
		criteria.createAlias("contactInfo", "cc");
		criteria.setProjection(Projections.property("cc.email"));
		return criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	public List<String> getEmailsByDomainAndCities(int demandDomainId, List<Integer> cityIds) {
		Criteria criteria = getCriteria();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		criteria.createAlias("demandDomains", "dd");
		criteria.add(Restrictions.eq("dd.id", demandDomainId));
		criteria.createAlias("contactInfo", "cc");
		criteria.createAlias("cc.city", "ccc");
		criteria.add(Restrictions.in("ccc.id", cityIds));
		criteria.setProjection(Projections.property("cc.email"));
		
		return criteria.list();
	}

	public Criteria createCompanyCriteria(CompanySearchObject searchObject) {
		final Criteria criteria = getCriteria();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		if (searchObject.getName() != null) {
			criteria.add(Restrictions.ilike("name", "%" + searchObject.getName() + "%"));
		}
		if (searchObject.getAccountId() != null) {
			criteria.add(Restrictions.eq("account.id", searchObject.getAccountId()));
		}
		if (searchObject.getCompanyId() != null) {
			criteria.add(Restrictions.eq("id", searchObject.getCompanyId()));
		}
		if (searchObject.getCompanyDomain() != null) {
			System.out.println("Here");
			criteria.add(Restrictions.eq("domain.id", searchObject.getCompanyDomain()));
		}
//		if (searchObject.getDemandDomainId() != null) {TODO
//			criteria.createAlias("demandDomains", "dd");
//			criteria.add(Restrictions.eq("dd.id", searchObject.getDemandDomainId()));
//		}
		
		return criteria;
	}

	public Long getCriteriaTotalCount(Criteria criteria) {
		criteria.setProjection(Projections.rowCount());
		return (Long) criteria.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<Company> searchCompanies(Criteria criteria, int page) {
		criteria.setMaxResults(PaginationConstants.COMPANY_PAGE_SIZE);
		criteria.setFirstResult((page - 1) * PaginationConstants.COMPANY_PAGE_SIZE);
		return criteria.list();
	}

	@SuppressWarnings("unchecked")
	public List<Company> getCompaniesByCompanyDomain(String domain) {
		Criteria criteria = getCriteria();
		criteria.createAlias("domain", "d");
		criteria.add(Restrictions.ilike("d.name", "%" + domain + "%"));
		criteria.addOrder(Order.asc("d.name"));
		return criteria.list();
	}
	

}
