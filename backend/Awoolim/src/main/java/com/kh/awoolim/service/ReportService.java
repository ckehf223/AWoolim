package com.kh.awoolim.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReportService {

	@Autowired
	private ReportMapper mapper;
	
	public void register(Report report) {
		mapper.create(report);
	}
	
	public List<Map<String,Object>> getReportList(int userId){
		
		return mapper.list(userId);
	}
	
	// 신고 목록 조회
    public List<Report> selectReportList() {
        return mapper.selectReportList();
    }

    // 신고 삭제
    public void deleteReport(int reportNo) {
    	mapper.deleteReport(reportNo);
    }

    // 신고 결과 처리, 경고 카운트 증가
    public void updateReportResult(Report report) {
    	mapper.updateReportResult(report);
    }
}
