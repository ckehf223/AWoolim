package com.kh.awoolim.domain;

import java.util.Date;

import lombok.Data;

@Data
public class Report {
	private int reportNo;
	private int userId;
	private int targetId;
	private String type;
	private String content;
	private Date regdate;
	private int result;
	private String resultMessage;
	 
}
