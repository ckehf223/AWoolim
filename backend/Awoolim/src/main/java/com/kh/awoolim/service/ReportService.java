package com.kh.awoolim.service;

import com.kh.awoolim.domain.Report;
import com.kh.awoolim.mapper.ReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    ReportMapper reportMapper;

    // 신고 목록 조회
    public List<Report> selectReportList() {
        return reportMapper.selectReportList();
    }

    // 신고 삭제
    public void deleteReport(int reportNo) {
        reportMapper.deleteReport(reportNo);
    }

    // 신고 결과 처리
    public void updateReportResult(Report report) {
        reportMapper.updateReportResult(report);
    }




}
