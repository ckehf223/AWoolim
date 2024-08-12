package com.kh.awoolim.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ClubGallery {
	private int picNo;
	private int userId;
	private int clubNo;
	private Date regDate;
	private String image;
}
