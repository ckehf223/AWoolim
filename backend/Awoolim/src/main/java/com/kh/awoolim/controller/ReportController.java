package com.kh.awoolim.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.service.ReportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/report")
public class ReportController {
	
	@Autowired
	private ReportService service;
	
	@PostMapping("/register")
	public void register(@RequestBody Report report) {
		log.info("REPORT register POST ENTER");
		System.out.println(report.toString());
		service.register(report);
	}
	
}
