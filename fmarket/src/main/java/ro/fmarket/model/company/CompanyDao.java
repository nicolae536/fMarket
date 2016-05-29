package ro.fmarket.model.company;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
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
		criteria.add(Restrictions.eq("", demandDomainId));
		return criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	public List<String> getEmailsByDomainAndCities(int demandDomainId, List<Integer> cityIds) {
		Criteria criteria = getCriteria();
		criteria.add(Restrictions.eq("", demandDomainId));
		return criteria.list();
	}

	public Criteria createCompanyCriteria(CompanySearchObject searchObject) {
		final Criteria criteria = getCriteria();
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		if (searchObject.getName() != null) {
			criteria.add(Restrictions.ilike("name", "%" + searchObject.getName() + "%"));
		}
		//TODO
		
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
	public List<Company> getAllCompanyNames(String domainName) {
		Criteria criteria = getCriteria();
		criteria.createAlias("domain", "d");
		if (StringUtils.isNotBlank(domainName)) {
			criteria.add(Restrictions.ilike("d.name", "%" + domainName + "%"));
		}
		criteria.setProjection(
				Projections.projectionList().add(Projections.property("d.name")).add(Projections.property("name")).add(Projections.property("id")));

		criteria.addOrder(Order.asc("d.name"));
		criteria.addOrder(Order.asc("name"));
		return criteria.list();
	}

}
