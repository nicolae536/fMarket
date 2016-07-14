package ro.fmarket.model.geographical.city;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cities")
public class CityController {

	@Autowired
	private CityService service;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<City> getCities() {
		return service.getAll();
	}
	
}
