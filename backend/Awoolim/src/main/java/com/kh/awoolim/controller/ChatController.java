package com.kh.awoolim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.ChatRoom;
import com.kh.awoolim.service.ChatService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {

	@Autowired
	private ChatService chatService;

	@Autowired
	private JWTUtil jwtUtil;
	
	@GetMapping("/chatrooms")
	public ResponseEntity<List<ChatRoom>> getChatRooms(HttpServletRequest request) {
		log.info("chatRooms GET ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			List<ChatRoom> list =chatService.getAllChatRooms(userId);
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
	}
	@GetMapping("/{clubNo}/messages")
	public ResponseEntity<List<Map<String,Object>>> getMessages(@PathVariable int clubNo) {
		log.info("chat messages GET ENTER");
		try {
			List<Map<String,Object>> messages = chatService.getMessagesByRoomId(clubNo);
			if(messages != null && messages.size() > 0 && !messages.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK).body(messages);
			}else {
				return ResponseEntity.status(HttpStatus.OK).body(null);
			}
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
}
