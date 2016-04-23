package ro.fmarket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.mail.MailServiceImpl;

@RestController
@RequestMapping("/test")
public class TestController {

//	@Autowired
//	private MailServiceImpl mailService;
	
	@RequestMapping(value = "/mail")
	public void sendMail() {
//		mailService.sendPasswordChangeMail("lucybaciu2006@gmail.com", "123456");
	}
	
}
