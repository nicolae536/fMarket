package ro.fmarket.model.subscriber;

public interface SubscriberService {

	void subscribeEmail(String email);

	void unsubscribeByToken(String email);

}
