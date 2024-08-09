package com.kh.awoolim.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.ChatRoom;
import com.kh.awoolim.mapper.ChatRoomMapper;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

	@Autowired
	private ChatRoomMapper chatRoomMapper;

	@Override
	public List<ChatRoom> getAllChatRooms() {
		return chatRoomMapper.findAll();
	}
}
