package ro.fmarket.model.company;

import java.util.List;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CompanyDao extends BaseDao<Company>{

	public CompanyDao() {
		super(Company.class);
	}

	
	public List<Company> getByDomain(int demandDomainId) {
		return null;
	}
	
}
