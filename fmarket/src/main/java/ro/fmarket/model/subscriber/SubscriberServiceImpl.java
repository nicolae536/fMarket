package ro.fmarket.model.subscriber;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.TokenUtils;

@Service
@Transactional
public class SubscriberServiceImpl implements SubscriberService {

	@Autowired
	private SubscriberDao dao;

	@Override
	public void subscribeEmail(String email) {
		Subscriber subscriber = dao.getByEmail(email);
		if (subscriber == null) {
			subscriber = createNewSubscriber(email);
			dao.save(subscriber);
		} else { // activate subscriber
			subscriber.setUnsubscribeDate(null);
			subscriber.setSubscribeDate(DateUtils.now());
			subscriber.setUnsubscribeToken(TokenUtils.generateToken());
			dao.save(subscriber);
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
		subscriber.setEmail(email);
		subscriber.setUnsubscribeToken(TokenUtils.generateToken());
		subscriber.setSubscribeDate(DateUtils.now());
		return subscriber;
	}

	@Override
	public void unsubscribeEmail(String email) {
		Subscriber subscriber = dao.getByEmail(email);
		if (subscriber != null) {
			subscriber.setUnsubscribeDate(DateUtils.now());
			dao.save(subscriber);
		}
	}

}
