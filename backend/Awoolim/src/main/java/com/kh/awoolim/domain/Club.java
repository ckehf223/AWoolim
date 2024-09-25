package com.kh.awoolim.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class Club {
	@Schema(description = "고유 식별자", example = "1")
	private int clubNo;
	@Schema(description = "타이틀", example = "서울시 맛집탐방")
	private String clubTitle;
	@Schema(description = "제한성별", example = "M")
	private String clubGender;
	@Schema(description = "제한 나이", example = "10세 이상")
	private String ageLimit;
	@Schema(description = "카테고리", example = "친목")
	private String category;
	@Schema(description = "지역(시/도)", example = "서울시")
	private String city;
	@Schema(description = "지역(시/군/구)", example = "강남구")
	private String district;
	@Schema(description = "타입", example = "1")
	private int regularType;
	@Schema(description = "제한 인원", example = "100")
	private int maxMember;
	@Schema(description = "모임장 식별 번호", example = "1")
	private int userId;
	@Schema(description = "지정날", example = "2024.09.23")
	private String dDay;
	@Schema(description = "프로필 사진", example = "12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg")
	private String clubImage;
	@Schema(description = "상세정보", example = "1")
	private String detailInfo;
	@Schema(description = "상태(모집중/모집마감)", example = "0")
	private int recruitment;
	@Schema(description = "참여 인원수", example = "1")
	private int memberCount;
}
