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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat", description = "채팅 관련 API")
public class ChatController {

	@Autowired
	private ChatService chatService;

	@Autowired
	private JWTUtil jwtUtil;
	
	@Operation(summary = "채팅방 조회", description = "참여 모임 채팅방 목록 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 채팅방 목록 반환")
    @ApiResponse(responseCode = "401", description = "accessToken 만료")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/chatrooms")
	public ResponseEntity<List<ChatRoom>> getChatRooms(@Parameter(description = "AccessToken을 확인하기 위한 request")HttpServletRequest request) {
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			List<ChatRoom> list =chatService.getAllChatRooms(userId);
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
	}
	
	@Operation(summary = "채팅메세지 조회", description = "참여 모임 중 특정 모임 채팅방 이전 메세지 내역을 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 채팅방 메세지 목록 반환")
    @ApiResponse(responseCode = "401", description = "메세지 내역 조회 중 오류 발생")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/{clubNo}/messages")
	public ResponseEntity<List<Map<String,Object>>> getMessages(@Parameter(description = "모임 고유 번호")@PathVariable int clubNo) {
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
