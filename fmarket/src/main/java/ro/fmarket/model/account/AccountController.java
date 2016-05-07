package ro.fmarket.model.account;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.LoginResponse;
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
	public void changePassword(@Valid @RequestBody ChangePasswordRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		boolean isLoggedIn = false;
		if (principal != null) {
			isLoggedIn = true;
			request.setEmail(principal.getUsername());
		}
		accountService.requestPasswordChange(request.getEmail(), request.getNewPassword(), isLoggedIn);
	}

	@RequestMapping(value = "/close", method = RequestMethod.DELETE)
	public void closeAccount(@AuthenticationPrincipal FMarketPrincipal principal) {

	}

	public void changeAccountDetails() {

	}

}
