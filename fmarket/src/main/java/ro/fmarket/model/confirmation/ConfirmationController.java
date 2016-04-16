package ro.fmarket.model.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {

	@Autowired
	private ConfirmationService service;
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public void confirmRegistration(@RequestParam("token") String token) {
		
	}
	
	@RequestMapping(value = "/pchange", method = RequestMethod.GET)
	public void confirmPasswordChange(@RequestParam("token") String token) {
		
	}
	
	@RequestMapping(value = "/demand", method = RequestMethod.GET)
	public void confirmNewDemand(@RequestParam("token") String token) {
		
	}
	
}
