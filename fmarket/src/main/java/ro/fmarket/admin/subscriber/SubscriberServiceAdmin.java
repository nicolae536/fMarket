package ro.fmarket.admin.subscriber;

import java.util.List;

import ro.fmarket.core.rest.PaginatedResponse;
import ro.fmarket.model.subscriber.Subscriber;

public interface SubscriberServiceAdmin {

	void subscribe(String email);

	void unsubscribe(Integer id);

	void deleteSubscriber(Integer id);

	List<Subscriber> getSubscribersForMobile();

	PaginatedResponse<SubscriberDTO> searchSubscribers(SubscriberSearchObject searchObject, Integer page);

}
