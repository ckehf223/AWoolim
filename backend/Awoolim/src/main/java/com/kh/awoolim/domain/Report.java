package com.kh.awoolim.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Report {

    private int reportNo;
    private int userId;
    private String userName;
    private String targetId;
    private String content;
    private Date regDate;
    private int result;
    private String resultMessage;


}
