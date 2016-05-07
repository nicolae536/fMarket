package ro.fmarket.model.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.core.rest.LoginResponse;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {

	@Autowired
	private ConfirmationService service;
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public LoginResponse confirmRegistration(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmRegistration(token);
	}
	
	@RequestMapping(value = "/passwordchange", method = RequestMethod.GET)
	public LoginResponse confirmPasswordChange(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmPasswordChange(token);
	}
	
	@RequestMapping(value = "/demand", method = RequestMethod.GET)
	public LoginResponse confirmDemandCreation(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmDemandCreation(token);
	}
	
}
