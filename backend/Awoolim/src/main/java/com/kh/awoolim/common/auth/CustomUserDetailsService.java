package com.kh.awoolim.common.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kh.awoolim.common.domain.CustomUserDetails;
import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.MemberMapper;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberMapper memberMapper;

	public CustomUserDetailsService(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}

	// 데이터 베이스에서 특정유저를 조회해서 return 해주는 메소드
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		//관리자로그인 경우 로직 작성해야함
		Member memberData = memberMapper.findByEmail(username);
		System.out.println(memberData.toString());
		if (memberData != null) {
			return new CustomUserDetails(memberData);
		}

		throw new UsernameNotFoundException("User not found with username: " + username);
	}

}
