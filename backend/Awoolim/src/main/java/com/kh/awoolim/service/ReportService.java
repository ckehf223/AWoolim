package com.kh.awoolim.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.mapper.ReportMapper;

@Service
public class ReportService {

	@Autowired
	private ReportMapper mapper;
	
	public void register(Report report) {
		mapper.create(report);
	}
}
