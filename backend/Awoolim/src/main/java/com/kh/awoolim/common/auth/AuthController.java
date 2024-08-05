package com.kh.awoolim.common.auth;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.common.jwt.JWTUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AuthController {

	private final JWTUtil jwtUtil;

	public AuthController(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/refresh")
	public void refreshToken(@RequestHeader("Authorization") String refreshToken, HttpServletResponse response)
			throws IOException {
		try {
			refreshToken = refreshToken.substring(7);

			if (!jwtUtil.isExpired(refreshToken)) {
				String username = jwtUtil.getUsername(refreshToken);
				String role = jwtUtil.getRole(refreshToken);
				String newAccessToken = jwtUtil.createJwt("access", username, role, 600000L);
				response.setHeader("Authorization", "Bearer " + newAccessToken);
				response.setStatus(HttpServletResponse.SC_OK);
			} else {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}
		} catch (IllegalArgumentException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			response.getWriter().write("Invalid JWT token: " + e.getMessage());
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.getWriter().write("An error occurred while processing the token.");
		}
	}

}