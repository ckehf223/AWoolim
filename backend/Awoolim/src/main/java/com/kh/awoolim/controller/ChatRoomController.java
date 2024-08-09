package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.ChatRoom;
import com.kh.awoolim.service.ChatRoomService;

@RestController
public class ChatRoomController {

	@Autowired
	private ChatRoomService chatRoomService;

	@GetMapping("/api/chatrooms")
	public List<ChatRoom> getChatRooms() {
		return chatRoomService.getAllChatRooms();
	}
}