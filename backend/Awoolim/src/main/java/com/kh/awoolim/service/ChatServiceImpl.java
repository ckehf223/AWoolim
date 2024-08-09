package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.mapper.ChatMapper;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatMapper chatMapper;

	@Override
	public List<Chat> getMessagesByClub(int clubNo) {
		return chatMapper.getMessagesByClub(clubNo);
	}

	@Override
	public void saveMessage(int clubNo, Chat message) {
		message.setClubNo(clubNo);
		chatMapper.saveMessage(message);
	}
}
