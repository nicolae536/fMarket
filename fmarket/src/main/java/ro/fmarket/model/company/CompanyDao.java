package ro.fmarket.model.company;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import ro.fmarket.admin.account.company.CompanySearchObject;
import ro.fmarket.core.base.BaseDao;
import ro.fmarket.core.constants.PaginationConstants;

@Repository
public class CompanyDao extends BaseDao<Company>{

	public CompanyDao() {
		super(Company.class);
	}

	
	@SuppressWarnings("unchecked")
	public List<Company> getByDomain(int demandDomainId) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("", demandDomainId));
		return criteria.list();
	}
	
	public Criteria createUserCriteria(CompanySearchObject searchObject) {
		final Criteria criteria = getCriteria();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		
		
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
	
}
