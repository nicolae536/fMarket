package ro.fmarket.model.geographical.city;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import ro.fmarket.core.base.BaseDao;

@Repository
public class CityDao extends BaseDao<City> {

	public CityDao() {
		super(City.class);
	}
	
	public void saveCounty() {
		String sql = "insert into County (name) select cc.name from City cc where cc.id=1";
		
		Query query = getSession().createQuery(sql);
		query.executeUpdate();
	}

}
