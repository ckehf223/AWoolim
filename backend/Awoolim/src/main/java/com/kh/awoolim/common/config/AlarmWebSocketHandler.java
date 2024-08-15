package com.kh.awoolim.common.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class AlarmWebSocketHandler extends TextWebSocketHandler {

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();
		System.out.println("Received alarm message: " + payload);
		session.sendMessage(new TextMessage("Alarm received: " + payload));
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New alarm connection established");
		session.sendMessage(new TextMessage("Welcome to the alarm service!"));
	}
}
