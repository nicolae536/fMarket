package ro.fmarket.facebook;

import org.springframework.aop.framework.Advised;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.view.RedirectView;

public class FacebookConnectController extends ConnectController {

	@Autowired
	private Facebook facebook;
	
	@Autowired
	public FacebookConnectController(ConnectionFactoryLocator connectionFactoryLocator, ConnectionRepository connectionRepository) {
		super(connectionFactoryLocator, connectionRepository);
	}

	@Override
	protected RedirectView connectionStatusRedirect(String providerId, NativeWebRequest request) {
		System.out.println("CONNECTED!!!");
		System.out.println(request.getUserPrincipal());
		
		return new RedirectView("/index.html#/SALUTBAAAA", true);
	}
	
	public RedirectView connectedView() {
		return null;
	}
	
	protected String connectedView(String providerId) {
		System.out.println("CONNECTED VIEW !!!");
		return "/index.html#/CONNECTEDVIEWWW";		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/data")
	public String printFacebookData() {
		if (facebook != null) {
			System.out.println(facebook.hashCode());
//			System.out.println(facebook.isAuthorized());
			Advised a = (Advised) facebook;
//			System.out.println(a.getTargetSource().getTarget());
		} else {
			System.out.println("Facebook is null");
		}
		return "index.html";
	}

}
