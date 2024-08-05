package com.kh.awoolim.common.auth;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.MemberMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberAuthService {
	
	private final MemberMapper memberMapper;
	private final PasswordEncoder passwordEncoder;

//	@Value("${kakao.client-id}")
//	private String kakaoClientId;
//
//	@Value("${kakao.client-secret}")
//	private String kakaoClientSecret;
//
//	@Value("${kakao.redirect-uri}")
//	private String kakaoRedirectUri;

	@Value("${naver.client-id}")
	private String naverClientId;

	@Value("${naver.client-secret}")
	private String naverClientSecret;

	@Value("${naver.redirect-uri}")
	private String naverRedirectUri;

	@Value("${google.client-id}")
	private String googleClientId;

	@Value("${google.client-secret}")
	private String googleClientSecret;

	@Value("${google.redirect-uri}")
	private String googleRedirectUri;

	public MemberAuthService(MemberMapper memberMapper, PasswordEncoder passwordEncoder) {
		this.memberMapper = memberMapper;
		this.passwordEncoder = passwordEncoder;
	}

	public boolean idCheck(String id) {
		if(memberMapper.findById(id) == 1) {
			return true;
		}else {
			return false; 
		}
	}

//	public List<String> idExist(String phone) {
//		List<String> ids = memberMapper.findIdByPhone(phone);
//		return ids;
//	}

	@Transactional
	public void registerMember( Member member) {
//		Member member = new Member();
//		member.setUserEmail(membeemail);
//		member.setPassword(passwordEncoder.encode(pw));
//		member.setUserName(name);
//		member.setUserPhone(phone);
//		member.setUserBirth(birth);
//		member.setUserGender(gender);

		try {
			memberMapper.create(member);
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			throw new RuntimeException("알 수 없는 오류가 발생했습니다.", e);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("회원 등록 중 오류가 발생했습니다.", e);
		}
	}

	
}