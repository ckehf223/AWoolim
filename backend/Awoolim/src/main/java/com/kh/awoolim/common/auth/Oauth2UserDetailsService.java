package com.kh.awoolim.common.auth;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.kh.awoolim.common.domain.CustomUserDetails;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.MemberMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class Oauth2UserDetailsService extends DefaultOAuth2UserService {
	private final MemberMapper memberMapper;

	public Oauth2UserDetailsService(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oauth2 = super.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		System.out.println("loadUser");
		Oauth2Response oauth2Response = null;
		if (registrationId.equals("google")) {
			oauth2Response = new GoogleResponse(oauth2.getAttributes());
		} else if (registrationId.equals("naver")) {
			oauth2Response = new NaverResponse(oauth2.getAttributes());
		}

		Member member = memberMapper.findByEmailType(oauth2Response.getEmail(),registrationId);
		if (member == null) {
			try {
				
				String email = URLEncoder.encode(oauth2Response.getEmail(), "UTF-8");
				String name = URLEncoder.encode(oauth2Response.getName(), "UTF-8");
				String type = URLEncoder.encode(oauth2Response.getProvider(),"UTF-8");
				String redirectUrl = "http://localhost:5173/joinMember?email=" + email + "&name=" + name+"&type="+type;
				throw new OAuth2AuthenticationException(new OAuth2Error("user_not_found"), redirectUrl);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}

		return new CustomUserDetails(member, oauth2Response);
	}
}