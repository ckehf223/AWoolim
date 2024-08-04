//package com.kh.awoolim.common.jwt;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Date;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import com.kh.awoolim.common.domain.CustomUserDetails;
//import com.kh.awoolim.common.domain.RefreshToken;
//import com.kh.awoolim.domain.Member;
//import com.kh.awoolim.mapper.RefreshTokenMapper;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//public class JWTFilter extends OncePerRequestFilter {
//
//	private final JWTUtil jwtUtil;
//	private final RefreshTokenMapper refreshTokenMapper;
//	
//	public JWTFilter(JWTUtil jwtUtil,RefreshTokenMapper refreshTokenMapper) {
//		this.jwtUtil = jwtUtil;
//		this.refreshTokenMapper = refreshTokenMapper;
//	}
//
//	// 필터에 대한 내부를 구현하는 메소드
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//
//		// 헤더에서 access키에 담긴 토큰을 꺼냄
//		String accessToken = request.getHeader("access");
//		String refreshToken = null;
//		Cookie[] cookies = request.getCookies();
//		for (Cookie cookie : cookies) {
//
//			if (cookie.getName().equals("refresh")) {
//
//				refreshToken = cookie.getValue();
//			}
//		}
//
//		// 토큰이 없다면 다음 필터로 넘김
//		if (accessToken == null) {
//			filterChain.doFilter(request, response);
//			return;
//		}
//
//		// 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
//		try {
//
//			if (!jwtUtil.isExpired(accessToken)) {
//				if (jwtUtil.isExpired(refreshToken)) {
//					String role = jwtUtil.getRole(refreshToken);
//					String username = jwtUtil.getUsername(refreshToken);
//					String newAccess = jwtUtil.createJwt("access", username, role, 3600000L);
//					response.setHeader("access", "Bearer " + newAccess);
//					response.addCookie(createCookie("refresh", refreshToken));
//					response.setStatus(HttpStatus.OK.value());
//				} else {
//					deleteRefreshToken(refreshToken);
//					response.sendRedirect("");
//					response.setHeader("access", null);
//					response.addCookie(deleteCookie());
//				}
//
//			}
//
//		} catch (ExpiredJwtException e) {
//
////			
////			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//			return;
//		}
//
//		// 토큰이 access인지 확인 (발급시 페이로드에 명시)
//		String category = jwtUtil.getCategory(accessToken);
//
//		if (!category.equals("access")) {
//
//			// response body
//			PrintWriter writer = response.getWriter();
//			writer.print("invalid access token");
//
//			// response status code
//			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//			return;
//		}
//
//		// username, role 값을 획득
//		String username = jwtUtil.getUsername(accessToken);
//		String role = jwtUtil.getRole(accessToken);
//
//		Member member = new Member();
//		member.setUserEmail(username);
//		member.setRole(role);
//		CustomUserDetails customUserDetails = new CustomUserDetails(member);
//
//		Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
//				customUserDetails.getAuthorities());
//		SecurityContextHolder.getContext().setAuthentication(authToken);
//
//		filterChain.doFilter(request, response);  
//	}
//
//	private Cookie createCookie(String key, String value) {
//
//		Cookie cookie = new Cookie(key, value);
//		cookie.setMaxAge(24 * 60 * 60);
//		cookie.setHttpOnly(true);
//
//		return cookie;
//	}
//
//	@Transactional
//	private void addRefreshToken(String username, String refresh, Long expiredMs) {
//
//		Date date = new Date(System.currentTimeMillis() + expiredMs);
//
//		RefreshToken refreshToken = new RefreshToken();
//		refreshToken.setUserName(username);
//		refreshToken.setRefresh(refresh);
//		refreshToken.setExpiration(date.toString());
//
//		refreshTokenMapper.create(refreshToken);;
//	}
//	
//	@Transactional
//	private void deleteRefreshToken(String refresh) {
//		refreshTokenMapper.delete(refresh);
//	}
//	
//	private Cookie deleteCookie(){
//		Cookie cookie = new Cookie("refresh", null);
//		cookie.setMaxAge(0);
//		cookie.setPath("/");
//
//		return cookie;
//	}
//	
//
//}
