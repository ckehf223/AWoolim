package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.service.ChatService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private final ChatService chatService;

	@Autowired
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}

	@GetMapping("/{clubNo}/messages")
	public List<Chat> getMessages(@PathVariable int clubNo, HttpServletResponse response) {
		List<Chat> messages = chatService.getMessagesByRoomId(clubNo);

		if (messages.isEmpty()) {
			response.setStatus(HttpServletResponse.SC_NO_CONTENT); // 204 No Content
		} else {
			response.setStatus(HttpServletResponse.SC_OK); // 200 OK
		}

		return messages;
	}
}
