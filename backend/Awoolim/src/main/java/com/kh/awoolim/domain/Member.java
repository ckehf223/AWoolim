package com.kh.awoolim.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class Member {
	@Schema(description = "고유 식별자", example = "1")
	private int userId;
	@Schema(description = "이메일", example = "ckehf223@gmail.com")
	private String userEmail;
	@Schema(description = "비밀번호", example = "$2a$10$kc3y2suHN2BPwyKbvN28NeMV3ozFwCvsqbMCmPtX3DBEE8AYpWakK")
	private String password;
	@Schema(description = "이름", example = "차재경")
	private String userName;
	@Schema(description = "생년월일", example = "1995-04-30")
	private String userBirth;
	@Schema(description = "전화번호", example = "01038473952")
	private String userPhone;
	@Schema(description = "성별", example = "M/W")
	private String userGender;
	@Schema(description = "닉네임", example = "차봉춘")
	private String nickName;
	@Schema(description = "프로필 이미지", example = "8c1ed05c-c5af-4d6a-84b6-e674c11ee73e.jpg")
	private String userImage;
	@Schema(description = "프로필 배경 이미지", example = "12047711-6f9d-41eb-99b4-c5bf6a50a3e8.jpg")
	private String userBackImage;
	@Schema(description = "프로필 상태 메세지", example = "모두 행복하세요~")
	private String userIntro;
	@Schema(description = "경고", example = "2")
	private int warningCount;
	@Schema(description = "회원 가입의 타입", example = "default/google/naver")
	private String snsType;
	@Schema(description = "권한", example = "ROLE_MEMBER")
	private String role;
}
