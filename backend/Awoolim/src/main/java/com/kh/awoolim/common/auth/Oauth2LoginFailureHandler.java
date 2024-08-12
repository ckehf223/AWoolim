package com.kh.awoolim.common.auth;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class Oauth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		if (exception instanceof OAuth2AuthenticationException) {
			OAuth2AuthenticationException oAuth2Exception = (OAuth2AuthenticationException) exception;
			String redirectUrl = oAuth2Exception.getMessage();
			log.info(redirectUrl);
			getRedirectStrategy().sendRedirect(request, response, redirectUrl);

		} else {
			super.onAuthenticationFailure(request, response, exception);
		}
	}
}