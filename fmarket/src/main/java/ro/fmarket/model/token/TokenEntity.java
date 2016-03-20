package ro.fmarket.model.token;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import lombok.Data;
import ro.fmarket.core.base.BaseEntity;

@Data
@MappedSuperclass
public class TokenEntity extends BaseEntity {

	@Column(nullable = false, unique = true, length = 50)
	private String token;

	@Column(nullable = false)
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime creationDate;

}
