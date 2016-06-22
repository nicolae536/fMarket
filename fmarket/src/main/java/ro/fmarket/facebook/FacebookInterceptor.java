package ro.fmarket.facebook;

import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactory;
import org.springframework.social.connect.web.ConnectInterceptor;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.request.WebRequest;

@Component
public class FacebookInterceptor implements ConnectInterceptor<Facebook>{

	@Override
	public void preConnect(ConnectionFactory<Facebook> connectionFactory, MultiValueMap<String, String> parameters, WebRequest request) {
		// TODO Auto-generated method stub
		System.out.println("PRECONNECT...");
	}

	@Override
	public void postConnect(Connection<Facebook> connection, WebRequest request) {
		// TODO Auto-generated method stub
		System.out.println("POSTONNECT...");
		
	}

}
