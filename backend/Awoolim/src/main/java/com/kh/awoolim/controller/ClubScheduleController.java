package com.kh.awoolim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.ClubSchedule;
import com.kh.awoolim.service.ClubScheduleService;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mypage/clubSchedule")
@Tag(name = "ClubSchedule", description = "모임 일정 관련 API")
public class ClubScheduleController {

	@Autowired
	private ClubScheduleService clubScheduleService;
	
	@Operation(summary = "특정 모임 일정 조회", description = "선택한 모임의 일정 목록 조회")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 일정 목록 반환")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@GetMapping("/{clubNo}")
	public List<ClubSchedule> getSchedules(@Parameter(description = "모임 번호")@PathVariable("clubNo") int clubNo, HttpServletResponse response) {
		List<ClubSchedule> schedules = clubScheduleService.getSchedulesByClubNo(clubNo);
		response.setHeader("Custom-Header", "CustomValue");
		response.setStatus(HttpServletResponse.SC_OK);
		return schedules;
	}

	@Operation(summary = "모임 일정 등록", description = "번호에 해당하는 모임에 일정을 등록 및 수정")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 일정 등록")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/register/{clubNo}")
	public void registerSchedules(@RequestBody Map<String, String> requestBody, @PathVariable("clubNo") int clubNo,
			HttpServletResponse response) {
		log.info("clubSchedule register POST ENTER");
		try {
			for (Map.Entry<String, String> entry : requestBody.entrySet()) {
				String key = entry.getKey();
				String value = entry.getValue();
				ClubSchedule cs = new ClubSchedule();
				cs.setClubNo(clubNo);
				cs.setDDay(key);
				cs.setContent(value);
				ClubSchedule check = clubScheduleService.findBySchedule(cs);
				if(check == null) {
					clubScheduleService.register(cs);
				}else {
					System.out.println(check.toString());
					cs.setScheduleNo(check.getScheduleNo());
					clubScheduleService.update(cs);
				}
			}
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@Operation(summary = "모임 일정 삭제", description = "선택한 모임의 일정 삭제")
	@ApiResponse(responseCode = "200", description = "정상적으로 모임 일정 삭제")
	@ApiResponse(responseCode = "500", description = "서버 오류 발생")
	@PostMapping("/delete")
	public void deleteSchedule(@RequestBody Map<String,String> requestBody,HttpServletResponse response) {
		log.info("deleteSchedule");
		try {
			int clubNo =Integer.parseInt(requestBody.get("clubNo"));
			String dDay = (String) requestBody.get("day");
			clubScheduleService.delete(clubNo, dDay);
			response.setStatus(HttpStatus.OK.value());
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
}
