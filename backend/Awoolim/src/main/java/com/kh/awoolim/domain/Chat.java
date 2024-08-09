package com.kh.awoolim.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Chat {
    private int chatNo;
    private int clubNo;
    private int userId;
    private String message;
    private Date regDate;
}
