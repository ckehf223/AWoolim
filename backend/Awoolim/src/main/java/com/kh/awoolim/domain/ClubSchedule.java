package com.kh.awoolim.domain;

import lombok.Data;

@Data
public class ClubSchedule {
	private int scheduleNo; // 일정 번호
	private int clubNo; // 모임 번호
	private String dDay; // 모임일
	private String content; // 모임 내용
}
