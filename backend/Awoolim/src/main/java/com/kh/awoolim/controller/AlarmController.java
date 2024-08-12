package com.kh.awoolim.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Alarm;
import com.kh.awoolim.service.AlarmService;

@RestController
@RequestMapping("/api/notifications")
public class AlarmController {

	@Autowired
	private AlarmService alarmService;

	// 특정 유저의 읽지 않은 알림 가져오기
	@GetMapping
	public ResponseEntity<List<Alarm>> getUnreadAlarms(Principal principal) {
		int userId = Integer.parseInt(principal.getName());
		List<Alarm> alarms = alarmService.getUnreadAlarms(userId);

		if (alarms.isEmpty()) {
			return ResponseEntity.noContent().build(); // 상태 코드 204
		}

		return ResponseEntity.ok(alarms); // 상태 코드 200과 함께 알림 반환
	}

	@PostMapping("/read")
	public ResponseEntity<String> markAlarmsAsRead(@RequestBody List<Integer> alarmNos) {
		if (alarmNos == null || alarmNos.isEmpty()) {
			return ResponseEntity.badRequest().body("Invalid or missing alarm IDs."); // 상태 코드 400
		}

		alarmService.markAlarmsAsRead(alarmNos);
		return ResponseEntity.ok("Notifications marked as read."); // 상태 코드 200
	}
}
