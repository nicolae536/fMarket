package ro.fmarket.model.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.exception.InvalidTokenException;
import ro.fmarket.core.rest.LoginResponse;
import ro.fmarket.model.account.Account;
import ro.fmarket.model.account.AccountService;
import ro.fmarket.security.SecurityUtils;

@RestController
public class MailLinksController {

	@Autowired
	private ConfirmationService service;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private SecurityUtils securityUtils;
	
	@RequestMapping(value = "/confirm/registration", method = RequestMethod.GET)
	public LoginResponse confirmRegistration(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmRegistration(token);
	}
	
	@RequestMapping(value = "/confirm/passwordchange", method = RequestMethod.GET)
	public LoginResponse confirmPasswordChange(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmPasswordChange(token);
	}
	
	@RequestMapping(value = "/confirm/demand", method = RequestMethod.GET)
	public LoginResponse confirmDemandCreation(@RequestParam("token") String token) throws InvalidTokenException {
		return service.confirmDemandCreation(token);
	}
	
	@RequestMapping(value = "/show/demands", method = RequestMethod.GET)
	public LoginResponse showUserDemands(@RequestParam("token") String token) throws InvalidTokenException {
		Account account = accountService.getByDemandTokenAccess(token);
		return securityUtils.authenticateUser(account.getId(), account.getEmail(), account.getType().name());
	}
	
}
