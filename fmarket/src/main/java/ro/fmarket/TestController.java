package ro.fmarket;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.model.account.AccountService;

@RestController
@RequestMapping("/test")
public class TestController {

	// @Autowired
	// private MailServiceImpl mailService;

	@Autowired
	private SessionRegistry sessionRegistry;
	
	@RequestMapping(value = "/useri")
	public List<String> sendMail() {
		List<String> usersNamesList = new ArrayList<String>();
		List<Object> principals = sessionRegistry.getAllPrincipals();
		for (Object principal : principals) {
			if (principal instanceof User) {
				usersNamesList.add(((User) principal).getUsername());
			}
		}
		return usersNamesList;
	}
	
	@Autowired
	private TestService service;
	
	@RequestMapping(method = RequestMethod.GET)
	public void test() {
		service.test();
	}

}
