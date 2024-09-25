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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Alarm", description = "알림 관련 API")
public class AlarmController {

    @Autowired
    private AlarmService alarmService;

    @Operation(summary = "알림 확인", description = "읽지 않은 알림 목록 조회")
    @ApiResponse(responseCode = "200", description = "알림 목록 반환")
    @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @GetMapping("/read")
    public ResponseEntity<List<Alarm>> getUnreadAlarms(@Parameter(description = "로그인 아이디")Principal principal) {
        String email = principal.getName();

        if(email.equals("admin")) {
        	return ResponseEntity.noContent().build(); //
        }
        int userId = alarmService.getUserIdByEmail(email);

        List<Alarm> alarms = alarmService.getUnreadAlarms(userId);

        if (alarms == null || alarms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(alarms);
    }
    
    @Operation(summary = "알림 상태 업데이트", description = "다수의 알림 번호를 받아 읽음으로 처리")
    @ApiResponse(responseCode = "200", description = "정상적으로 알림상태 업데이트")
    @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    @PostMapping("/mark-as-read")
    public ResponseEntity<String> markAlarmsAsRead( @RequestBody(required = true)@ArraySchema(schema = @Schema(type = "integer", description = "알림 번호")) List<Integer> alarmNos) {
    	try {
    		if (alarmNos == null || alarmNos.isEmpty()) {
    			return ResponseEntity.badRequest().body("Invalid or missing alarm IDs."); // 400 Bad Request
    		}
    		alarmService.markAlarmsAsRead(alarmNos);
    		return ResponseEntity.ok("Notifications marked as read."); // 200 OK
    	}catch(Exception e) {
    		e.printStackTrace();
    		return null;
    	}
	}
}
