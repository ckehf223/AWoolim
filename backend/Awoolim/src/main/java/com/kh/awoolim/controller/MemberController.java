package com.kh.awoolim.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Member;
import com.kh.awoolim.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MemberController {

	@Autowired
	private MemberService service;

	@PostMapping("/checkEmail")
	public boolean checkEmail(@RequestBody Map<String, String> requestBody) {
		String userEmail = requestBody.get("userEmail");
		return service.checkEmail(userEmail);
	}

	@PostMapping("/registerMember")
	public void registerMember(@RequestBody Member member) {
		log.info(member.toString());
		service.register(member);
	}
}
