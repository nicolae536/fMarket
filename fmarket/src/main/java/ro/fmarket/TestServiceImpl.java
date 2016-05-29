package ro.fmarket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import ro.fmarket.model.geographical.city.City;
import ro.fmarket.model.geographical.city.CityDao;

@Service
public class TestServiceImpl implements TestService {

	@Autowired
	private CityDao cityDao;
	
	@Override
	@Transactional
	public void test() {
		System.out.println(TransactionSynchronizationManager.isActualTransactionActive());
		City city = cityDao.get(1);
		City city2 = new City();
		city2.setCounty(city.getCounty());
		city2.setName("A");
		cityDao.save(city2);
		
		TestUitls.throwsss();
		
		City city3 = new City();
		city3.setName("B");
		city3.setCounty(city.getCounty());
		cityDao.save(city3);
	}
	
}
