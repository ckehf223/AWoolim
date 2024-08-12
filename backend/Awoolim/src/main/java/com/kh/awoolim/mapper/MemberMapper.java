package com.kh.awoolim.mapper;

import com.kh.awoolim.domain.Member;

public interface MemberMapper {
	
	public Member findById(int userId);
	
	public void create(Member member);

	public Member findByEmail(String email);
	
	public Member findByEmailType(String email,String type);
	//추가된 부분
	public Member findByPhone(String phone);
	
	public void updatePassword(String email,String password);
	
	public Member profile(int userId);
	
	public void updateProfile(Member member);
	
	public void updateUser(Member member);
}
