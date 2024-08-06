package com.kh.awoolim.common.jwt;

import java.io.IOException;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.GenericFilterBean;

import com.kh.awoolim.common.domain.RefreshToken;
import com.kh.awoolim.mapper.RefreshTokenMapper;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomLogoutFilter extends GenericFilterBean {

	private final JWTUtil jwtUtil;
	private final RefreshTokenMapper refreshTokenMapper;

	public CustomLogoutFilter(JWTUtil jwtUtil, RefreshTokenMapper refreshTokenMapper) {
		this.jwtUtil = jwtUtil;
		this.refreshTokenMapper = refreshTokenMapper;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
	}

	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {

		String requestUri = request.getRequestURI();
		if (!"/logout".equals(requestUri) || !"POST".equals(request.getMethod())) {
			filterChain.doFilter(request, response);
			return;
		}
		String refresh = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("refresh".equals(cookie.getName())) {
					refresh = cookie.getValue();
				}
			}
		}

		if (refresh == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		try {
			jwtUtil.isExpired(refresh);
		} catch (ExpiredJwtException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		String category = jwtUtil.getCategory(refresh);
		if (!"refresh".equals(category)) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		RefreshToken isExist = refreshTokenMapper.read(refresh);
		if (isExist == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}

		deleteRefreshToken(refresh);

		Cookie cookie = new Cookie("refresh", null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);
		response.setStatus(HttpServletResponse.SC_OK);
	}

	@Transactional
	private void deleteRefreshToken(String refresh) {
		refreshTokenMapper.delete(refresh);
	}
}