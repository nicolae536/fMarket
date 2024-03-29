package ro.fmarket.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurer;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.mem.InMemoryUsersConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.web.context.request.RequestContextHolder;

import ro.fmarket.facebook.FacebookConnectController;
import ro.fmarket.facebook.FacebookInterceptor;

@Configuration
@EnableSocial
public class SocialConfig implements SocialConfigurer {

	@Autowired
	private DataSource dataSource;

	@Autowired
	private FacebookInterceptor interceptor;
	
	@Override
	public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
		cfConfig.addConnectionFactory(new FacebookConnectionFactory(env.getProperty("facebook.appKey"), env.getProperty("facebook.appSecret")));
	}

	@Override
	public UserIdSource getUserIdSource() {
		return new UserIdSource() {
			@Override
			public String getUserId() {
				return RequestContextHolder.currentRequestAttributes().getSessionId();
			}
		};
	}

	@Override
	public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
//		return new JdbcUsersConnectionRepository(dataSource, connectionFactoryLocator, Encryptors.noOpText());
		return new InMemoryUsersConnectionRepository(connectionFactoryLocator);
	}

	@Bean
	@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
	public Facebook facebook(ConnectionRepository repository) {
		Connection<Facebook> connection = repository.findPrimaryConnection(Facebook.class);
		System.out.println("FACEBOOK BEAN..");
		if (connection == null) {
			System.out.println("IT IS NULL");
		} else {
			System.out.println(connection.getApi());
		}
		return connection != null ? connection.getApi() : null;
	}

	@Bean
	public FacebookConnectController getConnectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
		FacebookConnectController controller = new FacebookConnectController(connectionFactoryLocator, connectionRepository);
		controller.addInterceptor(interceptor);
		return controller;
	}

}
