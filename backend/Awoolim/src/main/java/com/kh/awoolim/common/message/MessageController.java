package com.kh.awoolim.common.message;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Slf4j
@RestController
public class MessageController {

	final DefaultMessageService messageService;

	@Value("${coolsms.api.sendNumber}")
	private String sendNumber;

	public MessageController(@Value("${coolsms.api.key}") String apiKey,
			@Value("${coolsms.api.secret}") String apiSecret) {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	@PostMapping("send-sms")
	public void sendSms(@RequestBody MessageRequest messageRequest, HttpSession session) {
		String code = randomCode();
		session.setAttribute("authenticationCode", code);

		Message message = new Message();
		message.setFrom(sendNumber);
		message.setTo(messageRequest.getPhoneNumber());
		message.setText("[어울림 인증서비스]\n인증번호 ( " + code + " )를 입력해주세요");

		try {
			messageService.send(message);
			log.info("message"+message);
		} catch (NurigoMessageNotReceivedException exception) {
			throw new RuntimeException("message error " + exception.getMessage());
		} catch (Exception exception) {
			throw new RuntimeException("message error " + exception.getMessage());
		}
	}

	@PostMapping("/check-code")
	public boolean checkCode(@RequestBody CodeRequest codeRequest, HttpSession session) {
		String storedCode = (String) session.getAttribute("authenticationCode");
		session.invalidate();
		return storedCode != null && storedCode.equals(codeRequest.getCode());
	
	}

	private String randomCode() {
		SecureRandom random = new SecureRandom();
		int number = 100000 + random.nextInt(900000);
		return String.valueOf(number);
	}
}
