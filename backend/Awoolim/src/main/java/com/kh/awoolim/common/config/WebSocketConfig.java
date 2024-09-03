package com.kh.awoolim.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	private final ChatWebSocketHandler chatWebSocketHandler;
	private final AlarmWebSocketHandler alarmWebSocketHandler;

	public WebSocketConfig(ChatWebSocketHandler chatWebSocketHandler, AlarmWebSocketHandler alarmWebSocketHandler) {
		this.chatWebSocketHandler = chatWebSocketHandler;
		this.alarmWebSocketHandler = alarmWebSocketHandler;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(chatWebSocketHandler, "/ws/chat").addInterceptors(new HttpSessionHandshakeInterceptor())
				.setAllowedOrigins("*");
		
		registry.addHandler(alarmWebSocketHandler, "/ws/alarms").addInterceptors(new HttpSessionHandshakeInterceptor())
				.setAllowedOrigins("*");
	}
}
