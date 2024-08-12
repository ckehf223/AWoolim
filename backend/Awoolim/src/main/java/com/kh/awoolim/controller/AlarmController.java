package com.kh.awoolim.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/read")
    public ResponseEntity<List<Alarm>> getUnreadAlarms(Principal principal) {
        String email = principal.getName();
        System.out.println("Principal Email: " + email);

        int userId = alarmService.getUserIdByEmail(email);

        List<Alarm> alarms = alarmService.getUnreadAlarms(userId);

        if (alarms == null || alarms.isEmpty()) {
            System.out.println("No unread alarms found for userId: " + userId);
            return ResponseEntity.noContent().build(); // 204 No Content
        }

        return ResponseEntity.ok(alarms); // 200 OK
    }

    @PostMapping("/mark-as-read")
    public ResponseEntity<String> markAlarmsAsRead(@RequestBody List<Integer> alarmNos) {
        System.out.println("Received alarmNos: " + alarmNos);

        if (alarmNos == null || alarmNos.isEmpty()) {
            System.out.println("No alarmNos received or alarmNos is empty.");
            return ResponseEntity.badRequest().body("Invalid or missing alarm IDs."); // 400 Bad Request
        }

        alarmService.markAlarmsAsRead(alarmNos);

		return ResponseEntity.ok("Notifications marked as read."); // 200 OK
	}
}
