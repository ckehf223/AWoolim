package com.kh.awoolim.common.auth;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.kh.awoolim.common.domain.CustomUserDetails;
import com.kh.awoolim.common.jwt.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class Oauth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JWTUtil jwtUtil;

	public Oauth2LoginSuccessHandler(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		CustomUserDetails member = (CustomUserDetails) authentication.getPrincipal();
		String userEmail = member.getUserEmail();
		int userId = member.getUserId();
		log.info(member.getUserEmail());
		log.info(member.getUsername());

		Collection<? extends GrantedAuthority> authorities = member.getAuthorities();
		Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
		GrantedAuthority auth = iterator.next();
		String role = auth.getAuthority();

		String accessToken = jwtUtil.createJwt("access", userEmail, role,3600000L,userId);
		String refreshToken = jwtUtil.createJwt("refresh", userEmail, role, 86400000L,userId);
		
		response.addCookie(createCookie("refresh", refreshToken));
		response.setStatus(HttpStatus.OK.value());
		
		getRedirectStrategy().sendRedirect(request, response, "http://localhost:5173/oauth2/redirect?token=Bearer "+accessToken+"&loginid="+userId);
		

	}

	private Cookie createCookie(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(60 * 60 * 60);
		cookie.setPath("/");
		cookie.setHttpOnly(false);
		return cookie;
	}
}