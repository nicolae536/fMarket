package ro.fmarket.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {

	private AuthenticationFailureHandler defaultHandler;

	public RestAuthenticationFailureHandler(AuthenticationFailureHandler defaultHandler) {
		this.defaultHandler = defaultHandler;
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {

		if ("true".equals(request.getHeader("X-Login-Ajax-call"))) {
			Gson gson = new Gson();

			JsonObject object = new JsonObject();
			object.addProperty("result", "failure");

			response.getWriter().write(gson.toJson(object));
			response.getWriter().flush();
		} else {
			defaultHandler.onAuthenticationFailure(request, response, exception);
		}

	}

}
