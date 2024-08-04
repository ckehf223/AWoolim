package com.kh.awoolim.mapper;

import com.kh.awoolim.domain.Member;

public interface MemberMapper {
	
	public int findById(String id);
	
	public void create(Member member);

	public Member findByEmail(String email);
}
