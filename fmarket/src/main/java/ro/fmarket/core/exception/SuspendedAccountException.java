package ro.fmarket.core.exception;

public class SuspendedAccountException extends RuntimeException {
	
	private static final long serialVersionUID = 1211299L;

	public SuspendedAccountException(String message) {
		super(message);
	}
}
