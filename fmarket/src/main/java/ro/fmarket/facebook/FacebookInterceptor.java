package ro.fmarket.facebook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactory;
import org.springframework.social.connect.web.ConnectInterceptor;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.request.WebRequest;

import ro.fmarket.model.registration.RegistrationService;
import ro.fmarket.security.SecurityUtils;

@Component
public class FacebookInterceptor implements ConnectInterceptor<Facebook>{

	@Autowired
	private RegistrationService registrationService;
	
	@Override
	public void preConnect(ConnectionFactory<Facebook> connectionFactory, MultiValueMap<String, String> parameters, WebRequest request) {
	}

	@Override
	public void postConnect(Connection<Facebook> connection, WebRequest request) {
		User userProfile = connection.getApi().userOperations().getUserProfile();
		String email = userProfile.getEmail();
		if (email != null) {
			registrationService.registerOrAuthenticateFacebookAccount(email);
		}
	}

}
