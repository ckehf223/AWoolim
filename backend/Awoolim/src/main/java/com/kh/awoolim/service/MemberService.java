package com.kh.awoolim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Member;
import com.kh.awoolim.mapper.MemberMapper;

@Service
public class MemberService {

	@Autowired
	private MemberMapper mapper;
	@Autowired
	public BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public boolean checkEmail(String userEmail) {
		Member member = null;
		member = mapper.findByEmail(userEmail);
		if(member == null) {
			return false;
		}
		return true;
	}
	
	public void register(Member member) {
		member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
		mapper.create(member);
	}
}
