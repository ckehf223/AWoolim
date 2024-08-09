package com.kh.awoolim.service;

import java.util.List;

import com.kh.awoolim.domain.Chat;

public interface ChatService {
	List<Chat> getMessagesByClub(int clubNo);

	void saveMessage(int clubNo, Chat message);
}