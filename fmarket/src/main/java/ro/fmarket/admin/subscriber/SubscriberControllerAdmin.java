package ro.fmarket.admin.subscriber;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ro.fmarket.core.rest.CollectionResponse;
import ro.fmarket.model.subscriber.Subscriber;

@RestController
@RequestMapping("/admin/subscribers")
public class SubscriberControllerAdmin {

	@Autowired
	private SubscriberServiceAdmin service;

	@RequestMapping(method = RequestMethod.POST)
	public void subscribe(@RequestParam("email") String email) {
		service.subscribe(email);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteSubscriber(@PathVariable("id") Integer id) {
		service.deleteSubscriber(id);
	}

	@RequestMapping(value = "/{id}/unsubscribe", method = RequestMethod.PUT)
	public void unsubscribe(@PathVariable("id") Integer id) {
		service.unsubscribe(id);
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public CollectionResponse<SubscriberDTO> searchSubscribers(@Valid @RequestBody SubscriberSearchObject searchObject, @RequestParam("page") Integer page) {
		return service.searchSubscribers(searchObject, page);
	}

	/**
	 * TODO delete after lab :D
	 * @param searchObject
	 * @return
	 */
	@RequestMapping(value = "/mobile", method = RequestMethod.GET)
	public List<Subscriber> getSubscribers() {
		return service.getSubscribersForMobile();
	}

}
