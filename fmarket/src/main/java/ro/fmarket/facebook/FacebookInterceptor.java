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

import ro.fmarket.security.SecurityUtils;

@Component
public class FacebookInterceptor implements ConnectInterceptor<Facebook>{

	@Autowired
	private SecurityUtils securityUtils;
	
	@Override
	public void preConnect(ConnectionFactory<Facebook> connectionFactory, MultiValueMap<String, String> parameters, WebRequest request) {
		// TODO Auto-generated method stub
		System.out.println("PRECONNECT...");
	}

	@Override
	public void postConnect(Connection<Facebook> connection, WebRequest request) {
		// TODO Auto-generated method stub
		System.out.println("POSTONNECT...");
		User userProfile = connection.getApi().userOperations().getUserProfile();
		System.out.println(userProfile.getEmail());
		System.out.println(userProfile.getFirstName());
		System.out.println(userProfile.getGender());
		
		securityUtils.authenticateUser(2, "luci@yahoo.com", "ADMIN");
	}

}
