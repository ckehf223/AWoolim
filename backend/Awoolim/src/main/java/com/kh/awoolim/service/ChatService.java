package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.mapper.ChatMapper;

@Service
public class ChatService {

	private final ChatMapper chatMapper;

	@Autowired
	public ChatService(ChatMapper chatMapper) {
		this.chatMapper = chatMapper;
	}

	public void saveMessage(Chat chat) {
		chatMapper.insertChat(chat);
	}

	public List<Chat> getMessagesByRoomId(int clubNo) {
		return chatMapper.selectChatsByClubNo(clubNo);
	}
}
