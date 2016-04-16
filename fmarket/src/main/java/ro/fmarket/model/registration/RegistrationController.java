package ro.fmarket.model.registration;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

	@Autowired
	private RegistrationService service;
	
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public void registerAccount(@Valid @RequestBody NewAccountRequest request) {
		service.registerAccount(request);
	}
	
}
