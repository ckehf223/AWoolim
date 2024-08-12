package com.kh.awoolim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.mapper.ClubMemberMapper;

@Service
public class ClubMemberService {
	
	@Autowired
	private ClubMemberMapper clubMemberMapper;
	
	public int signUp(int userId,int clubNo) {
		try {
			int check = clubMemberMapper.findById(userId,clubNo);
			if(check == 0) {
				clubMemberMapper.create(userId,clubNo);
				return 0;
			}
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
	
	public void acceptClubMember(int userId,int clubNo) {
		clubMemberMapper.update(userId,clubNo);
	}
	
	public void deleteClubMember(int userId,int clubNo) {
		clubMemberMapper.delete(userId,clubNo);
	}
	
	public int myClubSignupCount(int clubNo) {
		return clubMemberMapper.myClubSignupCount(clubNo);
	};
}
