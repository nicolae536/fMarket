package ro.fmarket.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.model.geographical.city.City;
import ro.fmarket.model.geographical.city.CityDao;
import ro.fmarket.model.geographical.county.County;

@Component
public class DatabaseInitializer implements CommandLineRunner {

	@Autowired
	private CityDao cityDao;

	@Override
	@Transactional
	public void run(String... arg0) throws Exception {
		cities();
		System.out.println("HELLO!!!");
	}

	private void cities() {
		City cj = new City();
		cj.setName("Cluj-Napoca");

		County county = new County();
		county.setName("Cluj");
		cj.setCounty(county);
		cityDao.save(cj);
		
		City buc = new City();
		buc.setName("Bucuresti");
		County ilfov = new County();
		ilfov.setName("Ilfov");
		buc.setCounty(county);
		cityDao.save(buc);
	}

}
