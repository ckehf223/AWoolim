package com.kh.awoolim.common.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

@Component
public class JWTUtil {

	private SecretKey secretKey;

	// application.properties 에 저장된 jwt 시크릿 key를 생성자를 만들때 전달한다.
	public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
		// secret 값을 HS256알고리즘 방식으로 변환하여 secretKey 변수에 저장하여 사용한다.
		this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
				Jwts.SIG.HS256.key().build().getAlgorithm());
	}

	public String getUsername(String token) {
		// 서버의 생성 키가 우리가 가지고 있는 키와 맞는지 확인 후 클레임 확인하고 getpayload 에 특정한 데이터를 가져올건데 get으로
		// 가져올 수 있음.
		return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username",
				String.class);
	}

	public String getRole(String token) {

		// username을 가져오는 것과 같은 방식으로 비교한 후 get에 role이라는 키를 가진 value를 가져온다.
		return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role",
				String.class);
	}

	public String getCategory(String token) {
		return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category",
				String.class);
	}

	// 토큰이 소멸되었는지, 시간이 지났는지 확인하는 method
	public Boolean isExpired(String token) {
		return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration()
				.before(new Date());
	}

	public int getUserId(String token) {
		return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId",
				Integer.class);
	}

	// jwt 토큰 생성하기
	public String createJwt(String category, String username, String role, Long expiredMs, int userId) {

		return Jwts.builder().claim("username", username) // claim 에 키 username value username
				.claim("role", role) // claim 에 키 role value role
				.claim("category", category).claim("userId", userId).issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + expiredMs)) // jwt토큰의 만료 시한
				.signWith(secretKey) // 시크릿 키를 가지고 암호화를 진행함
				.compact(); // 토큰을 컴팩트 시킨다.
	}
}