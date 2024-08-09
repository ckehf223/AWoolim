package com.kh.awoolim.domain;

import lombok.Data;

@Data
public class Club {
	private Long clubNo;
	private String clubTitle;
	private String clubGender;
	private String ageLimit;
	private String category;
	private String city;
	private String district;
	private int regularType;
	private int maxMember;
	private int userId;
	private String dDay;
	private String clubImage;
	private String detailInfo;
	private int recruitment;
	private int memberCount;
}
