package ro.fmarket.core.exception;

public class ClosedAccountException extends RuntimeException {
	
	private static final long serialVersionUID = 1211299L;

	public ClosedAccountException(String message) {
		super(message);
	}
}
