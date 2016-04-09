package ro.fmarket.confirmation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.mail.MailService;

@RestController
@RequestMapping("/confirm")
public class ConfirmationController {
	
	@Autowired
	private MailService mailService;
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public String confirmRegistration(@RequestParam(value = "token", required = true) String token) {
//		try {
//			final String accountEmail = registrationService.confirmRegistration(token);
//			securityUtils.authenticateUser(accountEmail);
//			LOG.info("Account with email " + accountEmail + " was successfully activated");
//			return REGISTRATION_COMPLETE_PAGE;
//		} catch (InvalidTokenException e) {
//			LOG.info("Account cannot be activated due to invalid token");
//			return INVALID_TOKEN_PAGE;
//		}
		return null;
	}

	/**
	 * Handle for password change confirmation.
	 * @param token
	 * @return
	 */
	@RequestMapping(value = "/passwordchange", method = RequestMethod.GET)
	public String confirmPasswordChange(@RequestParam(value = "token", required = true) String token) {
//		try {
//			final String accountEmail = passwordChangeService.confirmPasswordChange(token);
//			securityUtils.authenticateUser(accountEmail);
//			LOG.info("Passowrd was change for account with email" + accountEmail);
//		} catch (InvalidTokenException e) {
//			// TODO
//			LOG.info("Passowrd cannot be changed due to invalid token");
//		}
//		return "passwordChange";
		return null;
	}

	@RequestMapping(value = "/demand", method = RequestMethod.GET)
	public String confirmDemand(@RequestParam(value = "token", required = true) String token) {
//
//		try {
//			final String email = demandService.confirmDemandRegistration(token);
//			securityUtils.authenticateUser(email);
//			LOG.info("New demand was activated for account with email" + email);
//			return "pagina";
//		} catch (InvalidTokenException e) {
//			LOG.info("Demand cannot be activated due to invalid token");
//			// TODO Auto-generated catch block
//			return "lala";
//		}
		return null;
	}
}
