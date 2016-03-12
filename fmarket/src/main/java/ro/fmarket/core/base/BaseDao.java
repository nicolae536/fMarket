package ro.fmarket.core.base;

import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseDao<T> {

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	protected Class<T> type;

	public BaseDao(Class<T> type) {
		super();
		this.type = type;
	}

	protected Session getSession() {
		SessionFactory factory = entityManagerFactory.unwrap(SessionFactory.class);
		return factory.getCurrentSession();
	}

	@SuppressWarnings("unchecked")
	public T get(Integer id) {
		return (T) getSession().get(type, id);
	}

	public Long save(T entity) {
		return (Long) getSession().save(entity);
	}

	public void update(T entity) {
		getSession().update(entity);
	}

	public void saveOrUpdate(T entity) {
		getSession().saveOrUpdate(entity);
	}

	@SuppressWarnings("unchecked")
	public List<T> getList() {
		return (List<T>) getSession().createCriteria(type).list();
	}

	protected Criteria getCriteria() {
		return getSession().createCriteria(type);

	}

	public void delete(T entity) {
		getSession().delete(entity);
	}
	
	public void deleteById(Integer id) {
			String hql = "delete " + type.getClass().getSimpleName() + " where id = :id";
			final Query query = getSession().createQuery(hql);
			query.setParameter("id", id);
			query.executeUpdate();
	}

}
