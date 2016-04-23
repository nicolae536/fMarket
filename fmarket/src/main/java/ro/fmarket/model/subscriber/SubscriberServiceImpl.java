package ro.fmarket.model.subscriber;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.utils.DateUtils;

@Service
@Transactional
public class SubscriberServiceImpl implements SubscriberService {

	@Autowired
	private SubscriberDao dao;
	
	@Override
	public void subscribeEmail(String email) {
		final Subscriber subscriber = dao.getByEmail(email);
		if (subscriber == null) { // not exist yet
			final Subscriber newSubscriber = createNewSubscriber(email);
			dao.save(newSubscriber);
		} else {
			
		}
	}
	
	@Override
	public void unsubscribeByToken(String token) {
		final Subscriber subscriber = dao.getSubscriberByToken(token);
		if (subscriber != null) { // if was found
			subscriber.setUnsubscribeDate(DateUtils.now());
			dao.save(subscriber);
		}
	}
	
	private Subscriber createNewSubscriber(String email) {
		final Subscriber subscriber = new Subscriber();
		
		return subscriber;
	}
	
}
