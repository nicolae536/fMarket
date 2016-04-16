package ro.fmarket.model.subscriber;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubscriberServiceImpl implements SubscriberService {

	@Autowired
	private SubscriberDao dao;
	
	@Override
	public void subscribeEmail(String email) {
		
	}
	
	@Override
	public void unsubscribeEmail(String email) {
		
	}
	
}
