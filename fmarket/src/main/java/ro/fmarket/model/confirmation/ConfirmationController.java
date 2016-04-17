package ro.fmarket.model.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.exception.InvalidTokenException;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {

	@Autowired
	private ConfirmationService service;
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public void confirmRegistration(@RequestParam("token") String token) throws InvalidTokenException {
		service.confirmRegistration(token);
	}
	
	@RequestMapping(value = "/passwordchange", method = RequestMethod.GET)
	public void confirmPasswordChange(@RequestParam("token") String token) throws InvalidTokenException {
		service.confirmPasswordChange(token);
	}
	
	@RequestMapping(value = "/demand", method = RequestMethod.GET)
	public void confirmDemandCreation(@RequestParam("token") String token) throws InvalidTokenException {
		service.confirmDemandCreation(token);
	}
	
}
