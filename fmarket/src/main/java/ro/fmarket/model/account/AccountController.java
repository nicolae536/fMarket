package ro.fmarket.model.account;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.security.FMarketPrincipal;

@RestController
@RequestMapping("/accounts")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@RequestMapping(value = "/changepassword", method = RequestMethod.POST)
	public void changePassword(@Valid @RequestBody ChangePasswordRequest request, @AuthenticationPrincipal FMarketPrincipal principal) {
		boolean isLoggedIn = false;
		if (principal != null) {
			isLoggedIn = true;
			request.setEmail(principal.getUsername());
		}
		accountService.requestPasswordChange(request.getEmail(), request.getNewPassword(), isLoggedIn);
	}

}
