package ro.fmarket.model.geographical.city;

import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CityDao extends BaseDao<City> {

	public CityDao() {
		super(City.class);
	}

}
