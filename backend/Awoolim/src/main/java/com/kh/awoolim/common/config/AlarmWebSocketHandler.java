package com.kh.awoolim.common.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class AlarmWebSocketHandler extends TextWebSocketHandler {

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// 알림 메시지 처리 로직 추가
		String payload = message.getPayload();
		System.out.println("Received alarm message: " + payload);

		// 예를 들어, 특정 로직에 따라 알림 메시지를 클라이언트로 전송할 수 있습니다.
		session.sendMessage(new TextMessage("Alarm received: " + payload));
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New alarm connection established");
		// 연결된 클라이언트에게 환영 메시지를 보낼 수 있습니다.
		session.sendMessage(new TextMessage("Welcome to the alarm service!"));
	}
}
