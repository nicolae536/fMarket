package ro.fmarket.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Entity not found")
public class NotFoundException extends RuntimeException {

	public NotFoundException(String message) {
		super(message);
	}

	private static final long serialVersionUID = 1L;

}
