package com.kh.awoolim.common.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshToken {

	private Long id;
	private int userId;
	private String userEmail;
	private String refresh;
	private String expiration;
}
