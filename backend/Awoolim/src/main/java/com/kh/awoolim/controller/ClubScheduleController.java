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
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.ClubSchedule;
import com.kh.awoolim.service.ClubScheduleService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mypage/clubSchedule")
public class ClubScheduleController {

	@Autowired
	private ClubScheduleService clubScheduleService;

	@GetMapping("/{clubNo}")
	public List<ClubSchedule> getSchedules(@PathVariable("clubNo") int clubNo, HttpServletResponse response) {
		List<ClubSchedule> schedules = clubScheduleService.getSchedulesByClubNo(clubNo);
		response.setHeader("Custom-Header", "CustomValue");
		response.setStatus(HttpServletResponse.SC_OK);
		return schedules;
	}

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
				clubScheduleService.register(cs);
			}
			response.setStatus(HttpStatus.OK.value());
		} catch (Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
}
