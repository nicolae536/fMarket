package ro.fmarket.model.account;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.LoginResponse;
import ro.fmarket.model.account.details.AccountDetailsDTO;
import ro.fmarket.security.FMarketPrincipal;

@RestController
@RequestMapping("/accounts")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public LoginResponse getLoggedInUser(@AuthenticationPrincipal FMarketPrincipal principal) {
		LoginResponse response = new LoginResponse();
		if (principal != null) {
			response.setLoggedIn(true);
			response.setEmail(principal.getUsername());
			response.setAccountType(principal.getAuthorities().iterator().next().getAuthority());
		} else {
			response.setLoggedIn(false);
		}
		return response;
	}

	@RequestMapping(value = "/changepassword", method = RequestMethod.POST)
	public void changePassword(@Valid @RequestBody ChangePasswordRequest request) {
		accountService.requestPasswordChange(request.getEmail(), request.getNewPassword());
	}

	@RequestMapping(value = "/self/changepassword", method = RequestMethod.POST)
	public void changeAccountDetails(@Valid @RequestBody ChangePasswordRequestForAuthenticated request, @AuthenticationPrincipal FMarketPrincipal principal) {
		accountService.changePasswordForAuthenticatedUser(principal.getUsername(), request.getOldPassword(), request.getNewPassword());
	}
	
	@RequestMapping(value = "/self/subscription", method = RequestMethod.POST)
	public void setSubscription(@RequestParam("subscribe") Boolean subscribe, @AuthenticationPrincipal FMarketPrincipal principal) {
		accountService.setSubscription(principal.getUsername(), subscribe.booleanValue());
	}
	
	@RequestMapping(value = "/self/update", method = RequestMethod.PUT)
	public void updateAccount(@Valid @RequestBody UpdateAccountRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		accountService.updateAccount(principal.getAccountId(), request);
	}
	
	@RequestMapping(value = "/self/details", method = RequestMethod.GET)
	public AccountDetailsDTO getUserDetails(@AuthenticationPrincipal FMarketPrincipal principal) {
		return accountService.getAccountDetails(principal.getAccountId());
	}

}
