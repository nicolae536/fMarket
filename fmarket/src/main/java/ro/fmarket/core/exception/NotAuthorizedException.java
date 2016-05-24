package ro.fmarket.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "You don't have rights for requested action")
public class NotAuthorizedException extends RuntimeException {

	private static final long serialVersionUID = 643452L;
	
	public NotAuthorizedException() {
		super();
	}
	
	public NotAuthorizedException(String message) {
		super(message);
	}

}
