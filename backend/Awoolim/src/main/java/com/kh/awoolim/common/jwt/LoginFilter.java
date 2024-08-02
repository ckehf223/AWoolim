package com.kh.awoolim.common.jwt;

import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import com.kh.awoolim.common.domain.RefreshToken;
import com.kh.awoolim.mapper.RefreshTokenMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//security config 에서 disable 한 form 방식을 여기서 커스텀 한다.

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final JWTUtil jwtUtil;
	private RefreshTokenMapper refreshTokenMapper;

	public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,
			RefreshTokenMapper refreshTokenMapper) {

		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
		this.refreshTokenMapper = refreshTokenMapper;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		String username = obtainUsername(request);
		String password = obtainPassword(request);

		System.out.println(username);

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password,null);

		return authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authentication) {

		// 유저 정보
		String username = authentication.getName();

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
		GrantedAuthority auth = iterator.next();
		String role = auth.getAuthority();

		// 토큰 생성
		String access = jwtUtil.createJwt("access", username, role, 3600000L);
		String refresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

		// Refresh 토큰 저장
		addRefreshToken(username, refresh, 86400000L);

		// 응답 설정
		response.setHeader("access", "Bearer "+ access);
		response.addCookie(createCookie("refresh", refresh));
		response.setStatus(HttpStatus.OK.value());
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) {

		response.setStatus(401);
	}

	private Cookie createCookie(String key, String value) {

		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(24 * 60 * 60);
		cookie.setHttpOnly(true);

		return cookie;
	}

	@Transactional
	private void addRefreshToken(String username, String refresh, Long expiredMs) {

		Date date = new Date(System.currentTimeMillis() + expiredMs);

		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setUserName(username);
		refreshToken.setRefresh(refresh);
		refreshToken.setExpiration(date.toString());

		refreshTokenMapper.create(refreshToken);;
	}
}
