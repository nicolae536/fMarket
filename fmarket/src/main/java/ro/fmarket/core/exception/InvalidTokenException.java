package ro.fmarket.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Invalid token")
public class InvalidTokenException extends Exception {

	private static final long serialVersionUID = 6324L;

	public InvalidTokenException() {
		super();
	}
	
	public InvalidTokenException(String message) {
		super(message);
	}
	
}
