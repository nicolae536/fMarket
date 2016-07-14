package ro.fmarket.model.geographical.city;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CityServiceImpl implements CityService{

	@Autowired
	private CityDao dao;
	
	@Override
	public List<City> getAll() {
		return dao.getList();
	}
	
}
