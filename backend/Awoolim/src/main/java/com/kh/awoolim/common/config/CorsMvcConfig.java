package com.kh.awoolim.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry corsRegistry) {
		///**으로 들어오는 요청은 어떤 방식이든 처리하고 localhost:5173 으로 들어오는 것을 허용한다.
		corsRegistry.addMapping("/**").allowedOrigins("http://localhost:5173");
	}
}
