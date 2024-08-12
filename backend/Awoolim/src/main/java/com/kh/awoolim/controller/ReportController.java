package com.kh.awoolim.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.common.jwt.JWTUtil;
import com.kh.awoolim.domain.Report;
import com.kh.awoolim.service.ReportService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/report")
public class ReportController {
	
	@Autowired
	private ReportService service;
	
	@Autowired
	private JWTUtil jwtUtil;
	
	@PostMapping("/register")
	public void register(@RequestBody Report report,HttpServletResponse response) {
		log.info("REPORT register POST ENTER");
		try {
			service.register(report);
		}catch(Exception e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}
	}
	
	@GetMapping("/reportList")
	public ResponseEntity<List<Map<String,Object>>> getReportList(HttpServletRequest request,HttpServletResponse response){
		log.info("reportList GET ENTER");
		try {
			String accessToken = request.getHeader("Authorization").substring(7);
			int userId = jwtUtil.getUserId(accessToken);
			List<Map<String,Object>> mapList = service.getReportList(userId);
			return ResponseEntity.status(HttpStatus.OK).body(mapList);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
	}
	
}
