package com.kh.awoolim.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Club {
    private int clubNo;
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
    private String leaderName;


}
