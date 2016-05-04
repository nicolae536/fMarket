package ro.fmarket.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class RestAuthenticationFailureHandler implements AuthenticationFailureHandler {

	private AuthenticationFailureHandler defaultHandler;

	public RestAuthenticationFailureHandler(AuthenticationFailureHandler defaultHandler) {
		this.defaultHandler = defaultHandler;
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {

		if ("true".equals(request.getHeader("X-Login-Ajax-call"))) {
			ObjectMapper mapper = new ObjectMapper();
			ObjectNode node = mapper.createObjectNode();
			node.put("result", "failure");

			response.getWriter().write(node.toString());
			response.getWriter().flush();
		} else {
			defaultHandler.onAuthenticationFailure(request, response, exception);
		}

	}

}
