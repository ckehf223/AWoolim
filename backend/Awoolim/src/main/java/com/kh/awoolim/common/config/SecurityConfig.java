//package com.kh.awoolim.common.config;
//
//import java.util.Collections;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.authentication.logout.LogoutFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import com.kh.awoolim.common.jwt.CustomLogoutFilter;
//import com.kh.awoolim.common.jwt.JWTFilter;
//import com.kh.awoolim.common.jwt.JWTUtil;
//import com.kh.awoolim.common.jwt.LoginFilter;
//import com.kh.awoolim.mapper.RefreshTokenMapper;
//
//import jakarta.servlet.http.HttpServletRequest;
//
////configuration 선언
////security를 위한 config 때문에 enableWebSecurity 를 선언한다
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//	// AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
//	private final AuthenticationConfiguration authenticationConfiguration;
//	private final JWTUtil jwtUtil;
//	private RefreshTokenMapper refreshTokenMapper;
//
//	public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil,
//			RefreshTokenMapper refreshTokenMapper) {
//
//		this.authenticationConfiguration = authenticationConfiguration;
//		this.jwtUtil = jwtUtil;
//		this.refreshTokenMapper = refreshTokenMapper;
//	}
//
//	// AuthenticationManager Bean 등록
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//
//		return configuration.getAuthenticationManager();
//	}
//
//	@Bean
//	public BCryptPasswordEncoder bCryptPasswordEncoder() {
//
//		return new BCryptPasswordEncoder();
//	}
//
//	// SecurityFilterChain 스프링 시큐리티 에서 제공하는 인증,인가를 위한 필터 모음 클래스
//	// 개발자 취지와 목적에 맞게 커스텀 필터 또한 필터체인으로 포함시켜 사용할 수 있다.
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//		// 리액트,vue 와같은 프로그램과 같이 사용하여 쓸때 교차 출처 리소스 문제가 발생하여 설정하는 메소드
//		http.cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
//
//			@Override
//			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//				CorsConfiguration configuration = new CorsConfiguration();
//
//				// 허용할 port 번호
//				configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
//				// 허용할 메소드 ex) GET,POST,PUT,FETCH 등 모든 메소드 허용
//				configuration.setAllowedMethods(Collections.singletonList("*"));
//				// 프론트에서 Credentials를 설정하면 모두 true로 설정한다.
//				configuration.setAllowCredentials(true);
//				// 허용할 헤더
//				configuration.setAllowedHeaders(Collections.singletonList("*"));
//				// 허용을 허가하는 시간
//				configuration.setMaxAge(6000L);
//				// 헤더에 Authorization을 넣어서 전달할거기 때문에 허용을 해주어야 제대로 전달이 가능하다.
//				configuration.setExposedHeaders(Collections.singletonList("Authorization"));
//
//				return configuration;
//			}
//		}));
//
//		// csrf disable
//		http.csrf((auth) -> auth.disable());
//
//		// Form 로그인 방식 disable
//		// 기본적으로 security에서 제공하는 로그인 filter를 disable 시킴
//		http.formLogin((auth) -> auth.disable());
//
//		// http basic 인증 방식 disable
//		http.httpBasic((auth) -> auth.disable());
//
//		// 경로별 인가 작업
//		http.authorizeHttpRequests(
//				(auth) -> auth.requestMatchers("/auth/**").permitAll().requestMatchers("/auth/kakao/**").permitAll()
//						.requestMatchers("/auth/naver/**").permitAll().requestMatchers("/auth/google/**").permitAll()
//						.requestMatchers("/admin/**").hasRole("ADMIN").anyRequest().hasRole("MEMBER"));
//		
//		// LoginFilter 앞에 필터를 셋팅함
//		http.addFilterBefore(new JWTFilter(jwtUtil,refreshTokenMapper), LoginFilter.class);
//
//		// 검증받은 후 UsernamePasswordAuthenticationFilter 필터 대체하여 등록한다
//		http.addFilterAt(
//				new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshTokenMapper),
//				UsernamePasswordAuthenticationFilter.class);
//
//		http.addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshTokenMapper), LogoutFilter.class);
//
//		// 세션 설정 jwt에서는 session을 꼭 SRATELESS 상태로 만들어야 한다.***
//		http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//		return http.build();
//
//	}
//
//}
