package com.kh.awoolim.domain;

import lombok.Data;

@Data
public class Alarm {
	private int alarmNo;
	private int userId;
	private String message;
	private int isRead;
}
