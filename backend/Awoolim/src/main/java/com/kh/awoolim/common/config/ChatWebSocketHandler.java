package com.kh.awoolim.common.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.awoolim.domain.Chat;
import com.kh.awoolim.service.ChatService;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final ObjectMapper objectMapper;
	private final ChatService chatService;
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

	public ChatWebSocketHandler(ObjectMapper objectMapper, ChatService chatService) {
		this.objectMapper = objectMapper;
		this.chatService = chatService;
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		Chat chat = objectMapper.readValue(message.getPayload(), Chat.class);
		chatService.saveMessage(chat);

		// 모든 세션에 메시지를 전송
		sessions.forEach((id, s) -> {
			try {
				s.sendMessage(new TextMessage(objectMapper.writeValueAsString(chat)));
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// JWT 토큰 검증을 제거하고 세션을 바로 등록
		String sessionId = session.getId();
		sessions.put(sessionId, session);
		System.out.println("WebSocket connection established: " + sessionId);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status)
			throws Exception {
		// 연결이 종료될 때 세션을 제거
		String sessionId = session.getId();
		sessions.remove(sessionId);
		System.out.println("WebSocket connection closed: " + sessionId);
	}
}
