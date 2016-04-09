package ro.fmarket.model.menu;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class DomainMenuDao extends BaseDao<DomainMenuItem>{

	public DomainMenuDao() {
		super(DomainMenuItem.class);
	}

}
