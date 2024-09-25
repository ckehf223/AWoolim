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

	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		String requestUri = request.getRequestURI();
		if (!"/logout".equals(requestUri) || !"POST".equals(request.getMethod())|| requestUri.startsWith("/swagger-ui")) {
			filterChain.doFilter(request, response);
			return;
		}
		String refresh = getRefreshTokenFromCookies(request.getCookies());
		if (refresh == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		try {
			if (jwtUtil.isExpired(refresh)) {
				deleteRefreshToken(refresh);
				removeRefreshTokenCookie(response);
				response.setStatus(HttpServletResponse.SC_OK);
				return;
			}
		} catch (ExpiredJwtException e) {
			log.warn("Refresh token is expired. Deleting refresh token.");
			deleteRefreshToken(refresh);
			removeRefreshTokenCookie(response);
			response.setStatus(HttpServletResponse.SC_OK);
			return;
		} catch (Exception e) {
			log.error("An error occurred while processing the logout: {}", e.getMessage());
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
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
		removeRefreshTokenCookie(response);
		response.setStatus(HttpServletResponse.SC_OK);
	}

	private String getRefreshTokenFromCookies(Cookie[] cookies) {
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("refresh".equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	@Transactional
	private void deleteRefreshToken(String refresh) {
		refreshTokenMapper.delete(refresh);
	}

	private void removeRefreshTokenCookie(HttpServletResponse response) {
		Cookie cookie = new Cookie("refresh", null);
		cookie.setMaxAge(0); // Remove cookie
		cookie.setPath("/"); // Set path to root to ensure the cookie is removed
		response.addCookie(cookie);
	}
}
