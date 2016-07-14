package ro.fmarket.core.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class TokenUtils {

	public static String generateToken() {
		return RandomStringUtils.randomAlphanumeric(50);
	}
	
//	public static String generateRandomPassword() {
//		return RandomStringUtils.randomAlphanumeric(15);
//	}
	
}
