package com.kh.awoolim.common.auth;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.mapper.RefreshTokenMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AuthController {

	private final JWTUtil jwtUtil;
	private final RefreshTokenMapper refreshTokenMapper;

	public AuthController(JWTUtil jwtUtil, RefreshTokenMapper refreshTokenMapper) {
		this.jwtUtil = jwtUtil;
		this.refreshTokenMapper = refreshTokenMapper;
	}

	@PostMapping("/login")
	public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
		log.info("login POST");
		response.setStatus(HttpServletResponse.SC_OK);
		
	}

	@PostMapping("/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			log.info("/refresh POST Enter");
			String refresh = null;
			Cookie[] cookies = request.getCookies();
			for (Cookie cookie : cookies) {

				if (cookie.getName().equals("refresh")) {

					refresh = cookie.getValue();
				}
			}
			if(refresh == null) {
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
				jwtUtil.isExpired(refresh);
				String username = jwtUtil.getUsername(refresh);
				String role = jwtUtil.getRole(refresh);
				int userId = jwtUtil.getUserId(refresh);

				String newAccessToken = jwtUtil.createJwt("access", username, role, 3600000L, userId);
				response.setHeader("Authorization", "Bearer " + newAccessToken);
				response.setStatus(HttpServletResponse.SC_OK);
		} catch (IllegalArgumentException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.getWriter().write("Invalid JWT token: " + e.getMessage());
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.getWriter().write("An error occurred while processing the token.");
		}
	}

	@PostMapping("/deleteRefresh")
	public void deleteRefresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
		log.info("deleteRefreshToken");
		try {
			String refresh = null;
			Cookie[] cookies = request.getCookies();
			for (Cookie cookie : cookies) {

				if (cookie.getName().equals("refresh")) {

					refresh = cookie.getValue();
				}
			}
			// 로그아웃 처리
			deleteRefreshToken(refresh);

			// 리프레시 토큰 쿠키 삭제
			Cookie cookie = new Cookie("refresh", null);
			cookie.setMaxAge(0);
			cookie.setPath("/");
			cookie.setHttpOnly(true);
			response.addCookie(cookie);
			response.setStatus(HttpServletResponse.SC_OK);

		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}

	}
	@GetMapping("/getUserId")
	public ResponseEntity<Integer> getUserId(HttpServletRequest request,HttpServletResponse response) {
		try {
			log.info("getUserId GET ENTER");
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			return ResponseEntity.status(HttpStatus.OK).body(Integer.valueOf(userId));
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}


	@Transactional	
	private void deleteRefreshToken(String refresh) {
		refreshTokenMapper.delete(refresh);
	}

}