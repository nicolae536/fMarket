package ro.fmarket.model.geographical.city;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class DemandCityDao extends BaseDao<DemandCity> {

	public DemandCityDao() {
		super(DemandCity.class);
	}

}
