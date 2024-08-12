package com.kh.awoolim.mapper;

import java.util.List;
import java.util.Map;

import com.kh.awoolim.domain.Member;

public interface ClubMemberMapper {

	public List<Member> readClubMember(int clubNo);
	
	public int findById(int userId,int clubNo);
	
	public void create(int userId,int clubNo);
	
	public void delete(int userId, int clubNo);
	
	public void update(int userId,int clubNo);
	
	public int myClubSignupCount(int clubNo);
	
	public List<Map<String,Object>> readClubMemberList(int clubNo,int userId,int isAccept);
}
