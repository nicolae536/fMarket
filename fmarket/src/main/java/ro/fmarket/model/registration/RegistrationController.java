package ro.fmarket.model.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

	@Autowired
	private RegistrationService service;
	
}
