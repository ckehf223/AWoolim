package com.kh.awoolim.domain;

import java.util.Date;

import lombok.Data;

@Data
public class Notice {
	private int noticeNo;
	private String keyword;
	private String title;
	private String content;
	private int count;
	private Date regDate;

}
