package ro.fmarket.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

/**
 * Authentication success handler for integration with SPA applications that need to login using Ajax instead of a form post. Detects if its a ajax login
 * request, and if so sends a customized response in the body, otherwise defaults to the existing behaviour for none-ajax login attempts.
 */
public class RestAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private AuthenticationSuccessHandler defaultHandler;

	private static final Logger LOG = Logger.getLogger(RestAuthenticationSuccessHandler.class);

	public RestAuthenticationSuccessHandler(AuthenticationSuccessHandler defaultHandler) {
		this.defaultHandler = defaultHandler;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		if ("true".equals(request.getHeader("X-Login-Ajax-call"))) {
			FMarketPrincipal principal = (FMarketPrincipal) authentication.getPrincipal();
			LOG.info("Successful login for user " + principal.getUsername());
			Gson gson = new Gson();

			JsonObject user = new JsonObject();
			user.addProperty("username", principal.getUsername());

			if (principal.getAuthorities().size() > 0) {
				user.addProperty("authority", principal.getAuthorities().iterator().next().getAuthority());
			}

			JsonObject result = new JsonObject();
			result.addProperty("result", "success");
			result.add("user", user);

			response.setStatus(HttpStatus.OK.value());
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);

			response.getWriter().write(gson.toJson(result));
			response.getWriter().flush();
		} else {
			defaultHandler.onAuthenticationSuccess(request, response, authentication);
		}

	}
}