package com.kh.awoolim.domain;

import lombok.Data;

@Data
public class Member {
	
	private int userId;
	private String userEmail;
	private String password;
	private String userName;
	private String userBirth;
	private String userPhone;
	private String userGender;
	private String nickName;
	private String userImage;
	private String userBackImage;
	private String userIntro;
	private int warningCount;
	private String snsType;
	private String role;
	
}
