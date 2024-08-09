package com.kh.awoolim.common.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kh.awoolim.common.domain.CustomUserDetails;
import com.kh.awoolim.domain.Member;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

	private final JWTUtil jwtUtil;

	public JWTFilter(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		log.info("JWTFIlter Enter");
		String requestUri = request.getRequestURI();
		if (requestUri.equals("/refresh") || requestUri.equals("/deleteRefresh")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String accessToken = request.getHeader("Authorization");
		log.info("JWTFilter AccessToken=" + accessToken);
		if(accessToken == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			filterChain.doFilter(request, response);
			return;
		}
		
		if (accessToken != null && accessToken.startsWith("Bearer ")) {
			accessToken = accessToken.substring(7);
		}
		
		try {
			if (accessToken != null) {
				log.info("JWTFilter isExpired 들어옴");
				jwtUtil.isExpired(accessToken);
				String username = jwtUtil.getUsername(accessToken);
				String role = jwtUtil.getRole(accessToken);
				Member member = new Member();
				member.setUserName(username);
				member.setRole(role);
				CustomUserDetails customUserDetails = new CustomUserDetails(member);
				Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
						customUserDetails.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		} catch (ExpiredJwtException e) {
			log.info("JWTFILter 에서 오류 발생함");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}

		filterChain.doFilter(request, response);
	}

}