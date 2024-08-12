package com.kh.awoolim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.ClubSchedule;
import com.kh.awoolim.service.ClubScheduleService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/mypage/mycreateclub")
public class ClubScheduleController {

	@Autowired
	private ClubScheduleService clubScheduleService;

	@GetMapping("/{clubNo}")
	public List<ClubSchedule> getSchedules(@PathVariable("clubNo") int clubNo, HttpServletResponse response) {
		List<ClubSchedule> schedules = clubScheduleService.getSchedulesByClubNo(clubNo);

		// 예를 들어, 응답 헤더에 특정 값을 설정할 수 있습니다.
		response.setHeader("Custom-Header", "CustomValue");

		// 상태 코드를 200으로 설정 (기본값이지만 명시적으로 설정 가능)
		response.setStatus(HttpServletResponse.SC_OK);

		return schedules;
	}
}
