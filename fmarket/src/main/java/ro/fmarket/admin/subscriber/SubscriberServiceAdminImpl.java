package ro.fmarket.admin.subscriber;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ro.fmarket.core.constants.PaginationConstants;
import ro.fmarket.core.converter.SubscriberConverter;
import ro.fmarket.core.rest.CollectionResponse;
import ro.fmarket.core.utils.DateUtils;
import ro.fmarket.core.utils.PaginationUtils;
import ro.fmarket.core.utils.TokenUtils;
import ro.fmarket.model.subscriber.Subscriber;
import ro.fmarket.model.subscriber.SubscriberDao;

@Repository
@Transactional
public class SubscriberServiceAdminImpl implements SubscriberServiceAdmin {

	@Autowired
	private SubscriberDao dao;

	@Override
	public void subscribe(String email) {
		Subscriber subscriber = dao.getByEmail(email);
		if (subscriber == null) {
			subscriber = createNewSubscriber(email);
			dao.save(subscriber);
		} else { // activate subscriber
			subscriber.setUnsubscribeDate(null);
			subscriber.setSubscribeDate(DateUtils.now());
			dao.save(subscriber);
		}
	}

	@Override
	public void unsubscribe(Integer id) {
		Subscriber subscriber = dao.get(id);
		if (subscriber != null) {
			subscriber.setUnsubscribeDate(DateUtils.now());
			dao.save(subscriber);
		}
	}

	@Override
	public void deleteSubscriber(Integer id) {
		dao.deleteById(id);
	}

	private Subscriber createNewSubscriber(String email) {
		final Subscriber subscriber = new Subscriber();
		subscriber.setEmail(email);
		subscriber.setSubscribeDate(DateUtils.now());
		subscriber.setUnsubscribeToken(TokenUtils.generateToken());
		return subscriber;
	}
	
	@Override
	public List<Subscriber> getSubscribersForMobile() {
		return dao.getList();
	}

	@Override
	public CollectionResponse<SubscriberDTO> searchSubscribers(SubscriberSearchObject searchObject, Integer page) {
		Criteria criteria1 = dao.createSubscribersCriteria(searchObject);
		Criteria criteria2 = dao.createSubscribersCriteria(searchObject);
		List<Subscriber> subscribers = dao.searchSubscribers(criteria1, page);
		Long totalCount = dao.getCriteriaTotalCount(criteria2);
		final CollectionResponse<SubscriberDTO> result = new CollectionResponse<>(SubscriberConverter.toDTOList(subscribers));
		result.setTotalPages(PaginationUtils.calculateTotalPages(PaginationConstants.SUBSCRIBERS_PAGE_SIZE, totalCount.intValue()));
		result.setPage(page);
		return result;
	}
	
}
