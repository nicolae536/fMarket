package ro.fmarket.model.subscriber;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subscribers")
public class SubscriberController {

	@Autowired
	private SubscriberService subscriberService;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addSubscriber(@Valid @RequestBody NewSubscriberRequest request) {
		subscriberService.subscribeEmail(request.getEmail());
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public void unsubscribeByToken(@RequestParam String token) {
		subscriberService.unsubscribeByToken(token);
	}
	
}
