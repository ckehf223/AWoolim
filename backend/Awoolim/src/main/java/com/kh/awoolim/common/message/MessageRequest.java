package com.kh.awoolim.common.message;

public class MessageRequest {
	private String phoneNumber;
	private String message;

	// Getters and Setters
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}