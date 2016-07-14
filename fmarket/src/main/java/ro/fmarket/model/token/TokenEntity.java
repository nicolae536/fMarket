package ro.fmarket.model.token;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

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

	/**
     * 24h validity.
     * @return
     */
    @Transient
    public boolean isExpired() {
        final Date now = new Date();

        final Calendar calendar = Calendar.getInstance();
        calendar.setTime(creationDate.toDate());
        calendar.add(Calendar.DATE, 1);
        final Date tokenExpiryDate = calendar.getTime();
        return now.after(tokenExpiryDate);
    }
	
}
