package ro.fmarket.core.converter;

import java.util.ArrayList;
import java.util.List;

import ro.fmarket.admin.subscriber.SubscriberDTO;
import ro.fmarket.model.subscriber.Subscriber;

public class SubscriberConverter {

	public static SubscriberDTO toDTO(Subscriber subscriber) {
		final SubscriberDTO result = new SubscriberDTO();
		result.setEmail(subscriber.getEmail());
		result.setId(subscriber.getId());
		result.setUnsubscribeToken(subscriber.getUnsubscribeToken().substring(0, 10) + "...");
		result.setUnsubscribeDate(subscriber.getUnsubscribeDate());
		result.setSubscribeDate(subscriber.getSubscribeDate());
		if (subscriber.getUnsubscribeDate() != null) {
			result.setUnsubscribed(true);
		}
		return result;
	}

	public static List<SubscriberDTO> toDTOList(List<Subscriber> subscribers) {
		final List<SubscriberDTO> result = new ArrayList<>();
		for (Subscriber s : subscribers) {
			result.add(toDTO(s));
		}
		return result;
	}

}
