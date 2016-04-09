package ro.fmarket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.mail.MailService;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private MailService mailService;
	
	@RequestMapping(value = "/mail")
	public void sendMail() {
		mailService.sendMail("lucy_baciu_2006@yahoo.com");
	}
	
}
