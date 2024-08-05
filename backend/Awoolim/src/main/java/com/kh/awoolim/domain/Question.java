package com.kh.awoolim.domain;

import lombok.Data;

@Data
public class Question {
	private int questionNo; 		//질문 번호
	private String category;		//질문 카테고리
	private String title;			//질문 제목 == 질문
	private String answer;			//답변
}
